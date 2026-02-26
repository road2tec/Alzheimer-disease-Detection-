from flask import Blueprint, request, jsonify
from auth import token_required, doctor_required
from db import subscriptions_collection, plans_collection
from bson import ObjectId
from datetime import datetime

subscription_bp = Blueprint('subscriptions', __name__)

@subscription_bp.route('/', methods=['POST'])
@token_required
def create_subscription(current_user_id, user_role):
    data = request.json
    doctor_id = data.get('doctorId')
    plan_id = data.get('planId')
    
    if not doctor_id or not plan_id:
        return jsonify({"error": "Doctor ID and Plan ID are required"}), 400
        
    try:
        sub_entry = {
            "userId": ObjectId(current_user_id),
            "doctorId": ObjectId(doctor_id),
            "planId": ObjectId(plan_id),
            "status": "active",
            "startDate": datetime.utcnow()
        }
        result = subscriptions_collection.insert_one(sub_entry)
        return jsonify({"message": "Subscribed successfully", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@subscription_bp.route('/mine', methods=['GET'])
@token_required
def get_my_subscriptions(current_user_id, user_role):
    try:
        subs = list(subscriptions_collection.aggregate([
            {"$match": {"userId": ObjectId(current_user_id)}},
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
                "$lookup": {
                    "from": "doctor_plans",
                    "localField": "planId",
                    "foreignField": "_id",
                    "as": "plan"
                }
            },
            {"$unwind": "$plan"},
            {
                "$project": {
                    "_id": 1,
                    "status": 1,
                    "startDate": 1,
                    "doctorName": "$doctor.name",
                    "planName": "$plan.name",
                    "price": "$plan.price"
                }
            }
        ]))
        for s in subs:
            s['_id'] = str(s['_id'])
            s['startDate'] = s['startDate'].isoformat()
        return jsonify(subs), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@subscription_bp.route('/doctor/patients', methods=['GET'])
@doctor_required
def get_subscribed_patients(current_user_id, user_role):
    try:
        subs = list(subscriptions_collection.aggregate([
            {"$match": {"doctorId": ObjectId(current_user_id), "status": "active"}},
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
                    "userId": "$user._id",
                    "userName": "$user.name",
                    "userEmail": "$user.email",
                    "startDate": 1
                }
            }
        ]))
        for s in subs:
            s['_id'] = str(s['_id'])
            s['userId'] = str(s['userId'])
            s['startDate'] = s['startDate'].isoformat()
        return jsonify(subs), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
