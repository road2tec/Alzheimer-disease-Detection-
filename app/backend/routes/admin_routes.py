from flask import Blueprint, jsonify
from auth import admin_required
from db import users_collection, predictions_collection

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
