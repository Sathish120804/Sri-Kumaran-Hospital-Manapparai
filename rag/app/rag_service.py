from pathlib import Path

import chromadb
from sentence_transformers import SentenceTransformer
import ollama


# ==========================================
# 1. Local embedding model
# ==========================================

print("Loading embedding model...")

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

print("Embedding model loaded!")


# ==========================================
# 2. ChromaDB
# ==========================================

chroma_client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = chroma_client.get_or_create_collection(
    name="hospital_knowledge"
)


# ==========================================
# 3. Read hospital document
# ==========================================

document_path = Path("documents/hospital.txt")

text = document_path.read_text(
    encoding="utf-8"
)


# ==========================================
# 4. Chunking
# ==========================================

chunks = [
    chunk.strip()
    for chunk in text.split("\n\n")
    if chunk.strip()
]

print(f"Total chunks: {len(chunks)}")


# ==========================================
# 5. Create embeddings
# ==========================================

embeddings = embedding_model.encode(
    chunks
).tolist()

print("Embeddings generated!")


# ==========================================
# 6. Store in ChromaDB
# ==========================================

ids = [
    f"hospital-{i}"
    for i in range(len(chunks))
]

# Recreate collection to avoid duplicate IDs
try:
    chroma_client.delete_collection(
        "hospital_knowledge"
    )
except Exception:
    pass

collection = chroma_client.create_collection(
    name="hospital_knowledge"
)

collection.add(
    ids=ids,
    documents=chunks,
    embeddings=embeddings
)

print("Hospital knowledge stored!")


# ==========================================
# 7. User question
# ==========================================

question = input(
    "\nAsk something about Sri Kumaran Hospital: "
)


# ==========================================
# 8. Embed question
# ==========================================

question_embedding = embedding_model.encode(
    question
).tolist()


# ==========================================
# 9. Retrieve relevant chunks
# ==========================================

results = collection.query(
    query_embeddings=[question_embedding],
    n_results=3
)

retrieved_documents = results["documents"][0]


print("\n========== RETRIEVED INFORMATION ==========\n")

for document in retrieved_documents:
    print(document)
    print("--------------------------------------------")


# ==========================================
# 10. Build context
# ==========================================

context = "\n\n".join(
    retrieved_documents
)


# ==========================================
# 11. RAG prompt
# ==========================================

prompt = f"""
You are the AI assistant for Sri Kumaran Hospital,
Manapparai.

Answer the user's question using ONLY the hospital
information provided below.

Do not invent information.

If the answer is not available, say:
"I don't have that information."

Hospital information:

{context}

User question:

{question}
"""


# ==========================================
# 12. Generate answer with Ollama
# ==========================================

response = ollama.chat(
    model="gemma3:4b",
    messages=[
        {
            "role": "system",
            "content": (
                "You are a helpful hospital information "
                "assistant. Do not provide medical diagnosis."
            )
        },
        {
            "role": "user",
            "content": prompt
        }
    ]
)


# ==========================================
# 13. Final answer
# ==========================================

print("\n========== AI ANSWER ==========\n")

print(
    response["message"]["content"]
)