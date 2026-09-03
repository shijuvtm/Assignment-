from flask import Flask,jsonify,request
from models.pmodel import get_prompt
from models.hmodel import save_history,get_exist_response
from dotenv import load_dotenv
from groq import Groq
import os
import asyncio

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
 
@app.route("/queries", methods=["POST"])
async def queries():
    data = request.get_json()
    user_inputs = data["userInputs"]

    prompt_data = get_prompt()
    template = prompt_data["template"]

    async def process_input(user_input):
        existing = get_exist_response(user_input)

        if existing:
            return {
                "userInput": user_input,
                "response": existing["response"],
                "source": "database"
            }

        final_prompt = template.replace(
            "{{userInput}}",
            user_input
        )

        response = await asyncio.to_thread(
            Api.chat.completions.create,
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": final_prompt
                }
            ]
        )

        result = response.choices[0].message.content

        save_history(
            user_input,
            final_prompt,
            result
        )

        return {
            "userInput": user_input,
            "response": result,
            "source": "groq"
        }

    results = await asyncio.gather(
        *(process_input(item) for item in user_inputs)
    )

    return jsonify({
        "responses": results
    })
    
if __name__=="__main__":
    app.run(debug=True)
