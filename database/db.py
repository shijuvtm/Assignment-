import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

load_dotenv()

mongo_url = os.getenv("MONGO_URI")
database_name = "edubot1"

if not mongo_url:
    raise ValueError("MONGO_URI environment variable is not set")

try:
    client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
    client.admin.command('ping')
    db = client[database_name]
    prompts = db["prompt"]
    history = db["history"]
except ConnectionFailure as e:
    raise ConnectionFailure(f"Failed to connect to MongoDB: {e}")
except Exception as e:
    raise Exception(f"Database initialization error: {e}")
