from flask import Blueprint, request, jsonify
from auth import token_required, admin_required
from db import db
from bson import ObjectId
from datetime import datetime

feedback_bp = Blueprint('feedback', __name__)
feedback_collection = db["feedback"]

@feedback_bp.route('/', methods=['POST'])
@token_required
def submit_feedback(current_user_id, user_role):
    data = request.json
    content = data.get('content')
    rating = data.get('rating')

    if not content:
        return jsonify({"error": "Feedback content required"}), 400

    feedback_entry = {
        "userId": ObjectId(current_user_id),
        "content": content,
        "rating": rating,
        "createdAt": datetime.utcnow()
    }
    
    try:
        feedback_collection.insert_one(feedback_entry)
        return jsonify({"message": "Feedback submitted successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@feedback_bp.route('/', methods=['GET'])
@admin_required
def get_all_feedback(current_user_id, user_role):
    try:
        # Join with users to get names
        pipeline = [
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user"
                }
            },
            {"$unwind": "$user"},
            {
                "$project": {
                    "_id": 1,
                    "content": 1,
                    "rating": 1,
                    "createdAt": 1,
                    "userName": "$user.name",
                    "userEmail": "$user.email"
                }
            },
            {"$sort": {"createdAt": -1}}
        ]
        feedbacks = list(feedback_collection.aggregate(pipeline))
        for f in feedbacks:
            f['_id'] = str(f['_id'])
            f['createdAt'] = f['createdAt'].isoformat()
        return jsonify(feedbacks), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
