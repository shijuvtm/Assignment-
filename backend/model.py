from pymongo import MongoClient
from config import MONGO_URI

client=MongoClient(MONGO_URI)
db=client.mydatabase

users_collection=db["users"]
files_collection=db["files"]

def create_user(email, hashed_password):
    users_collection.insert_one({"email": email, "password": hashed_password})
def find_user(email):
    return users_collection.find_one({"email": email})
def save_file(filename):
    files_collection.insert_one({"filename": filename})
def get_files():
    return list(files_collection.find({},{"_id": 0,"filename": 1}))