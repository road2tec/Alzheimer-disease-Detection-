from flask import Blueprint, request, jsonify
import os
from db import users_collection
from auth import hash_password, check_password, generate_token
from bson import ObjectId

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = 'user' # Admin registration restricted to system defaults

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = hash_password(password)
    user_id = users_collection.insert_one({
        "name": name,
        "email": email,
        "password": hashed_pw,
        "role": role,
        "createdAt": ObjectId().generation_time
    }).inserted_id

    token = generate_token(user_id, role)
    return jsonify({"message": "User created successfully", "token": token, "role": role}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})
    
    # Check regular users first
    if user and check_password(password, user['password']):
        token = generate_token(user['_id'], user['role'])
        return jsonify({
            "token": token, 
            "role": user['role'],
            "name": user['name']
        }), 200
    
    # Check default admin credentials from .env
    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")
    
    if email == admin_email and password == admin_password:
        # Create a mock ID for admin or use a fixed one
        token = generate_token("admin_bypass", "admin")
        return jsonify({
            "token": token,
            "role": "admin",
            "name": "System Administrator"
        }), 200
    
    return jsonify({"error": "Invalid credentials"}), 401
