from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag_service import ask_rag


app = FastAPI(
    title="Sri Kumaran Hospital RAG API"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://192.168.1.6:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ==========================================
# Request model
# ==========================================

class ChatRequest(BaseModel):
    question: str


# ==========================================
# Health check
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Sri Kumaran Hospital RAG API is running"
    }


# ==========================================
# RAG Chat
# ==========================================

@app.post("/api/chat")
def chat(request: ChatRequest):

    answer = ask_rag(
        request.question
    )

    return {
        "question": request.question,
        "answer": answer
    }