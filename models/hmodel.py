from database.db import history

def get_exist_response(user_input):
    return history.find_one({"userInput":user_input})


def save_history(user_input,prompt,response):
    history.insert_one({
          "userInput":user_input,
	  "prompt":prompt,
	  "response":response })
