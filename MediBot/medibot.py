from fastapi import FastAPI, HTTPException
import requests

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# Hugging Face API Config
HF_API_KEY = "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"  
API_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct" 
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

@app.post("/chat")
async def chat(query: dict):
    try:
        
        if "text" not in query:
            raise HTTPException(status_code=400, detail="Missing 'text' key in request payload")

        payload = {"inputs": query["text"]}
        response = requests.post(API_URL, headers=HEADERS, json=payload)

        # Debugging
        print("Response Status:", response.status_code)
        print("Response Body:", response.text)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        return response.json()

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")
