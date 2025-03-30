from fastapi import FastAPI,File,UploadFile
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
import shutil

app=FastAPI()
app.add_middleware(CORSMiddleware,allow_origins=["*"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

client=AsyncIOMotorClient("mongodb://localhost:27017")
db=client["mydatabase"]

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
   with open(f"uploads/{file.filename}", "wb") as buffer:
       shutil.copyfileobj(file.file, buffer)
   await db.files.insert_one({"filename": file.filename})
   return {"message:":"File uploaded successfully!"}

@app.get("/files")
async def get_files():
    files = await db.files.find().to_list(100)
    return [{"name":file["filename"],"url":f"/uploads/{file['filename']}"} for file in files]