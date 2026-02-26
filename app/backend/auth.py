import jwt
import bcrypt
import datetime
import os
from functools import wraps
from flask import request, jsonify
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "medical_secret_key_2024")

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(password, hashed_password):
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password)

def generate_token(user_id, role):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': str(user_id),
        'role': role
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            print("DEBUG AUTH: Token is missing from request headers")
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user_id = data['sub']
            user_role = data['role']
        except Exception as e:
            print(f"DEBUG AUTH: Token validation failed for token: {token[:10]}... Error: {str(e)}")
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401
        
        return f(current_user_id, user_role, *args, **kwargs)
    
    return decorated

def admin_required(f):
    @wraps(f)
    @token_required
    def decorated(current_user_id, user_role, *args, **kwargs):
        if user_role != 'admin':
            return jsonify({'message': 'Admin privilege required!'}), 403
        return f(current_user_id, user_role, *args, **kwargs)
    return decorated

def doctor_required(f):
    @wraps(f)
    @token_required
    def decorated(current_user_id, user_role, *args, **kwargs):
        if user_role not in ['doctor', 'admin']:
            return jsonify({'message': 'Doctor privilege required!'}), 403
        return f(current_user_id, user_role, *args, **kwargs)
    return decorated
