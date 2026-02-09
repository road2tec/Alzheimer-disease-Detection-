from flask import Blueprint, request, jsonify
import os
import torch
from auth import token_required
from db import predictions_collection
from model_loader import load_model
from preprocess import preprocess_image, preprocess_clinical
from grad_cam import generate_attention_map
from bson import ObjectId

predict_bp = Blueprint('predict', __name__)

# Config
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models', 'hybrid_alzheimer_model.pt')
GRAD_CAM_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'results', 'grad_cam')

# Load Model
DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
model = load_model(MODEL_PATH, DEVICE)

@predict_bp.route('/predict', methods=['POST'])
@token_required
def predict(current_user_id, user_role):
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image_file = request.files['image']
    age = request.form.get('age')
    gender = request.form.get('gender')
    mmse = request.form.get('mmse')
    cdr = request.form.get('cdr')
    
    try:
        # Save temp file
        temp_path = os.path.join(GRAD_CAM_FOLDER, f"temp_{current_user_id}.png")
        image_file.save(temp_path)
        
        # Preprocess
        img_tensor = preprocess_image(temp_path).to(DEVICE)
        clinical_data = {'age': age, 'gender': gender, 'mmse': mmse, 'cdr': cdr}
        clinical_tensor = preprocess_clinical(clinical_data).to(DEVICE)
        
        # Inference
        with torch.no_grad():
            outputs = model(img_tensor, clinical_tensor)
            probs = torch.softmax(outputs, dim=1)
            confidence, predicted_idx = torch.max(probs, 1)
        
        labels = ['CN', 'MCI', 'AD']
        prediction = labels[predicted_idx.item()]
        
        # Explainability
        grad_cam_filename = generate_attention_map(model, img_tensor, GRAD_CAM_FOLDER)
        
        # Save to MongoDB
        prediction_entry = {
            "userId": ObjectId(current_user_id),
            "age": age,
            "gender": gender,
            "mmse": mmse,
            "cdr": cdr,
            "prediction": prediction,
            "confidence": round(confidence.item(), 4),
            "gradCamImage": grad_cam_filename,
            "createdAt": ObjectId().generation_time
        }
        predictions_collection.insert_one(prediction_entry)
        
        return jsonify({
            "prediction": prediction,
            "confidence": round(confidence.item(), 4),
            "grad_cam_image": grad_cam_filename
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@predict_bp.route('/history', methods=['GET'])
@token_required
def get_history(current_user_id, user_role):
    try:
        history = list(predictions_collection.find({"userId": ObjectId(current_user_id)}).sort("createdAt", -1))
        # Convert ObjectId to string for JSON serialization
        for entry in history:
            entry['_id'] = str(entry['_id'])
            entry['userId'] = str(entry['userId'])
            entry['createdAt'] = entry['createdAt'].isoformat()
        return jsonify(history), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
