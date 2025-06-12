# from fastapi import FastAPI, HTTPException
# import requests

# from fastapi.middleware.cors import CORSMiddleware
# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )




# # Hugging Face API Config
# HF_API_KEY = "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"  
# API_URL = "https://router.huggingface.co/hf-inference/models/tiiuae/falcon-7b-instruct" 
# HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}

# @app.post("/chat")
# async def chat(query: dict):
#     try:
        
#         if "text" not in query:
#             raise HTTPException(status_code=400, detail="Missing 'text' key in request payload")

#         payload = {"inputs": query["text"]}
#         response = requests.post(API_URL, headers=HEADERS, json=payload)

#         # Debugging
#         print("Response Status:", response.status_code)
#         print("Response Body:", response.text)

#         if response.status_code != 200:
#             raise HTTPException(status_code=response.status_code, detail=response.text)

#         return response.json()

#     except requests.exceptions.RequestException as e:
#         raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")

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

# Together AI Config
TOGETHER_API_KEY = "01a80152531ef51d917fb43008a5bfd99d742d84ce8ca91744dafd9f18add101"  # Replace with your key
TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"
HEADERS = {
    "Authorization": f"Bearer {TOGETHER_API_KEY}",
    "Content-Type": "application/json"
}

# Choose a cost-effective model
MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2"  # You can also try llama-3-8b

@app.post("/chat")
async def chat(query: dict):
    try:
        if "text" not in query:
            raise HTTPException(status_code=400, detail="Missing 'text' key in request payload")

        prompt_text = query["text"]

        payload = {
            "model": MODEL_NAME,
            "messages": [
                {"role": "system", "content": "You are Medibot, a kind and responsible AI assistant trained to answer only general medical questions. If a user asks something unrelated to health, DECLINE THEIR REQUEST AND DO NOT ANSWER."},
                {"role": "user", "content": prompt_text}
            ],
            "max_tokens": 200,
            "temperature": 0.7
        }

        response = requests.post(TOGETHER_API_URL, headers=HEADERS, json=payload)

        # Debugging output
        print("Response Status:", response.status_code)
        print("Response Body:", response.text)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        result = response.json()
        return {"response": result["choices"][0]["message"]["content"]}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Request failed: {str(e)}")
