from flask import Blueprint, request, jsonify
from auth import token_required, admin_required
from db import reviews_collection, users_collection
from bson import ObjectId
from datetime import datetime

review_bp = Blueprint('reviews', __name__)

def update_doctor_rating(doctor_id):
    pipeline = [
        {"$match": {"doctorId": ObjectId(doctor_id)}},
        {"$group": {"_id": "$doctorId", "avgRating": {"$avg": "$rating"}}}
    ]
    result = list(reviews_collection.aggregate(pipeline))
    if result:
        avg = round(result[0]['avgRating'], 1)
        users_collection.update_one(
            {"_id": ObjectId(doctor_id)},
            {"$set": {"rating": avg}}
        )

@review_bp.route('/', methods=['POST'])
@token_required
def add_review(current_user_id, user_role):
    data = request.json
    doctor_id = data.get('doctorId')
    rating = data.get('rating')
    comment = data.get('comment')
    
    if not doctor_id or not rating:
        return jsonify({"error": "Doctor ID and rating are required"}), 400
        
    try:
        review_entry = {
            "userId": ObjectId(current_user_id),
            "doctorId": ObjectId(doctor_id),
            "rating": float(rating),
            "comment": comment,
            "createdAt": datetime.utcnow()
        }
        reviews_collection.insert_one(review_entry)
        update_doctor_rating(doctor_id)
        return jsonify({"message": "Review added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@review_bp.route('/doctor/<id>', methods=['GET'])
def get_doctor_reviews(id):
    try:
        # If admin wants all reviews for moderation
        if id == 'all':
            match_stage = {}
        else:
            match_stage = {"doctorId": ObjectId(id)}

        reviews = list(reviews_collection.aggregate([
            {"$match": match_stage},
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
                "$lookup": {
                    "from": "users",
                    "localField": "doctorId",
                    "foreignField": "_id",
                    "as": "doctor"
                }
            },
            {"$unwind": "$doctor"},
            {
                "$project": {
                    "_id": 1,
                    "rating": 1,
                    "comment": 1,
                    "createdAt": 1,
                    "userName": "$user.name",
                    "doctorName": "$doctor.name"
                }
            },
            {"$sort": {"createdAt": -1}}
        ]))
        for r in reviews:
            r['_id'] = str(r['_id'])
            r['createdAt'] = r['createdAt'].isoformat()
        return jsonify(reviews), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@review_bp.route('/<id>', methods=['DELETE'])
@admin_required
def delete_review(current_user_id, user_role, id):
    try:
        review = reviews_collection.find_one({"_id": ObjectId(id)})
        if not review:
            return jsonify({"error": "Review not found"}), 404
            
        doctor_id = review['doctorId']
        reviews_collection.delete_one({"_id": ObjectId(id)})
        update_doctor_rating(doctor_id)
        return jsonify({"message": "Review deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
