import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

Mongo_url=os.getenv("MONGO_URI")
Database_name="edubot1"

client=MongoClient(Mongo_url)
db=client[Database_name]
prompts=db["prompt"]
history=db["history"]
