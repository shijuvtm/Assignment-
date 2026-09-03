from flask import Flask,jsonify,request
from models.pmodel import get_prompt
from models.hmodel import save_history,get_exist_response
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

app=Flask(__name__)

Api=Groq(api_key=os.getenv("API_KEY"))

@app.route("/",methods=["GET"])
def home():
    return "Flask and mongoDB connected"

@app.route("/query",methods=["POST"])
def query():
    data=request.get_json()
    user_input=data["userInput"]
    existing_data=get_exist_response(user_input)
    if existing_data:
       return jsonify({
 	    "userInput":user_input,
            "response":existing_data["response"],
            "source":"database"   })

    prompt_data=get_prompt()
    template=prompt_data["template"]
    final_prompt=template.replace("{{userInput}}",user_input)
    
    response=Api.chat.completions.create(
       model="llama-3.1-8b-instant",
       messages=[ {  "role":"user","content":final_prompt }]
    )

    ai_res=response.choices[0].message.content
    save_history(user_input,final_prompt,ai_res)
    return jsonify({
           "userInput":user_input,
           "response":ai_res,
           "source":"groq"  
     })

if __name__=="__main__":
    app.run(debug=True)
