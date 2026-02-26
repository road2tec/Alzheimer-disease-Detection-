from flask import Blueprint, request, jsonify
from auth import token_required, doctor_required
from db import plans_collection
from bson import ObjectId

plan_bp = Blueprint('plans', __name__)

@plan_bp.route('/', methods=['GET'])
def get_plans():
    try:
        doctor_id = request.args.get('doctorId')
        query = {}
        if doctor_id:
            query['doctorId'] = ObjectId(doctor_id)
            
        plans = list(plans_collection.find(query))
        for p in plans:
            p['_id'] = str(p['_id'])
            p['doctorId'] = str(p['doctorId'])
        return jsonify(plans), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@plan_bp.route('/', methods=['POST'])
@doctor_required
def create_plan(current_user_id, user_role):
    data = request.json
    try:
        plan_entry = {
            "doctorId": ObjectId(current_user_id),
            "name": data.get('name'),
            "price": data.get('price'),
            "features": data.get('features', []),
            "duration": data.get('duration', 'Monthly')
        }
        result = plans_collection.insert_one(plan_entry)
        return jsonify({"message": "Plan created", "id": str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@plan_bp.route('/<id>', methods=['DELETE'])
@doctor_required
def delete_plan(current_user_id, user_role, id):
    try:
        result = plans_collection.delete_one({"_id": ObjectId(id), "doctorId": ObjectId(current_user_id)})
        if result.deleted_count:
            return jsonify({"message": "Plan deleted"}), 200
        return jsonify({"error": "Plan not found or unauthorized"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
