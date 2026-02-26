from flask import Blueprint, jsonify, request
from auth import admin_required, hash_password
from db import users_collection, predictions_collection
from bson import ObjectId

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_all_users(current_user_id, user_role):
    users = list(users_collection.find({}, {"password": 0}))
    for user in users:
        user['_id'] = str(user['_id'])
        if 'createdAt' in user and not isinstance(user['createdAt'], str):
            user['createdAt'] = user['createdAt'].isoformat()
    return jsonify(users), 200

from datetime import datetime, timedelta

@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_stats(current_user_id, user_role):
    # Basic counts
    total_users = users_collection.count_documents({})
    total_predictions = predictions_collection.count_documents({})
    
    # Results Distribution (CN vs MCI vs AD)
    pipeline_results = [
        {"$group": {"_id": "$prediction", "count": {"$sum": 1}}}
    ]
    distribution = list(predictions_collection.aggregate(pipeline_results))
    formatted_dist = {d['_id']: d['count'] for d in distribution}

    # Daily Activity (Last 30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    pipeline_activity = [
        {"$match": {"createdAt": {"$gte": thirty_days_ago}}},
        {"$group": {
            "_id": {
                "year": {"$year": "$createdAt"},
                "month": {"$month": "$createdAt"},
                "day": {"$dayOfMonth": "$createdAt"}
            },
            "count": {"$sum": 1}
        }},
        {"$sort": {"_id.year": 1, "_id.month": 1, "_id.day": 1}}
    ]
    activity = list(predictions_collection.aggregate(pipeline_activity))
    
    formatted_activity = []
    for a in activity:
        date_str = f"{a['_id']['year']}-{a['_id']['month']:02d}-{a['_id']['day']:02d}"
        formatted_activity.append({"date": date_str, "scans": a['count']})

    # Recent activity
    recent_predictions = list(predictions_collection.find().sort("createdAt", -1).limit(20))
    for p in recent_predictions:
        p['_id'] = str(p['_id'])
        p['userId'] = str(p['userId'])
        p['createdAt'] = p['createdAt'].isoformat()

    return jsonify({
        "totalUsers": total_users,
        "totalPredictions": total_predictions,
        "distribution": formatted_dist,
        "dailyActivity": formatted_activity,
        "recentPredictions": recent_predictions
    }), 200

@admin_bp.route('/users/<user_id>', methods=['DELETE'])
@admin_required
def delete_user(current_user_id, user_role, user_id):
    from bson import ObjectId
    try:
        res = users_collection.delete_one({"_id": ObjectId(user_id)})
        if res.deleted_count:
            return jsonify({"message": "User deleted"}), 200
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/users/<user_id>/role', methods=['POST'])
@admin_required
def update_user_role(current_user_id, user_role, user_id):
    from flask import request
    from bson import ObjectId
    new_role = request.json.get('role')
    if new_role not in ['user', 'doctor', 'admin']:
        return jsonify({"error": "Invalid role"}), 400
    
    try:
        res = users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"role": new_role}})
        if res.modified_count:
            return jsonify({"message": f"Role updated to {new_role}"}), 200
        return jsonify({"error": "Update failed"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@admin_bp.route('/doctors', methods=['POST'])
@admin_required
def create_doctor(current_user_id, user_role):
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({"error": "Missing required fields"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 400

    hashed_pw = hash_password(password)
    specialization = data.get('specialization', 'Neurologist')
    experience = data.get('experience', '5+ Years')
    
    user_id = users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw,
        "role": 'doctor',
        "specialization": specialization,
        "experience": experience,
        "rating": 0.0,
        "createdAt": datetime.utcnow()
    }).inserted_id

    return jsonify({"message": "Doctor created successfully", "id": str(user_id)}), 201
