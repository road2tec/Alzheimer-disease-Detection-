import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = "alzheimer_ai_db"

try:
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    
    # Collections
    users_collection = db["users"]
    predictions_collection = db["predictions"]
    logs_collection = db["logs"]
    
    # Test connection
    client.server_info()
    print("✅ Connected to MongoDB successfully.")
except Exception as e:
    print(f"❌ MongoDB Connection Error: {e}")

def get_db():
    return db
