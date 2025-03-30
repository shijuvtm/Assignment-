from flask import Flask,request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash,check_password_hash
import jwt,datetime
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app=Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.config["MONGO_URI"]="mongodb://localhost:27017/mydatabase"
mongo=PyMongo(app)

@app.route("/register", methods=["POST"])  # Fixed typo in 'methods'
def register():
    data = request.get_json()
    if not data or "email" not in data or "password" not in data:  # Added validation
        return jsonify({"message": "Email and password are required"}), 400
    hashed_password = generate_password_hash(data["password"], method="pbkdf2:sha256")  # Fixed hash method
    logging.debug(f"Registering user with email: {data['email']} and hashed password: {hashed_password}")
    mongo.db.users.insert_one({"email": data["email"], "password": hashed_password})
    return jsonify({"message": "User registered successfully!"})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data or "email" not in data or "password" not in data:  # Added validation
        return jsonify({"message": "Email and password are required"}), 400
    user = mongo.db.users.find_one({"email": data["email"]})
    if user:
        logging.debug(f"User found: {user}")
        if check_password_hash(user["password"], data["password"]):
            # Create JWT token
            token = jwt.encode(
                {"email": user["email"], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                "secret_key",
                "HS256"
            )
            return jsonify({"message": "Login successful", "token": token, "email": user["email"]})
        else:
            logging.debug("Password check failed")
    else:
        logging.debug("User not found")
    return jsonify({"message": "Invalid credentials"}), 401

if __name__=="__main__":
    app.run(debug=True,port=5000)
