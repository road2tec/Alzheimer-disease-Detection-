from flask import Blueprint, jsonify

plan_bp = Blueprint('plans', __name__)

@plan_bp.route('/', methods=['GET'])
def get_plans():
    plans = [
        {
            "id": "basic",
            "name": "Standard Consultation",
            "price": 1000,
            "description": "Basic neuro-report audit by certified neurologists.",
            "features": ["1 Report Review", "Email Support", "Digital Certificate"]
        },
        {
            "id": "premium",
            "name": "Executive Care Plan",
            "price": 2000,
            "description": "Priority clinical oversight with detailed longitudinal analysis.",
            "features": ["3 Report Reviews", "Video Consultation", "Priority Analysis", "Personal Care Manager"]
        }
    ]
    return jsonify(plans), 200
