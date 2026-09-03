from database.db import prompts

def get_prompt():
    return prompts.find_one({"_id":"Education_prompt"})

      
