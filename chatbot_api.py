from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import HumanMessage
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables import RunnableWithMessageHistory
from dotenv import load_dotenv
from pymongo import MongoClient
import os

# Load environment variables
load_dotenv()
api_key = os.getenv("GROQ_API_KEY")
langchain_key = os.getenv("LANGCHAIN_API_KEY")
os.environ["LANGCHAIN_API_KEY"] = langchain_key
os.environ["LANGCHAIN_TRACING_V2"] = "true"

# MongoDB setup
mongo = MongoClient(os.getenv("MONGODB_URI"))
db = mongo["test"]  # Replace with your DB name
orders_collection = db["orders"]
users_collection = db["users"]
menus_collection = db["menus"]

# FastAPI setup
app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# LangChain LLM setup
model = ChatGroq(groq_api_key=api_key, model="llama3-8b-8192")
prompt = ChatPromptTemplate.from_messages([
    ("system",
     """You are a smart and friendly food ordering assistant.

You have access to this user data:
- Name: {username}
- Most ordered items: {top_items}

Instructions:
- Greet the user **only at the beginning** of the conversation.
- If the session has previous messages, **do not greet again**.
- Recommend favorite items based on {top_items}.
- If the user replies 'yes', continue based on the previous question.
- Do NOT repeat yourself. Advance the conversation.
- If asked about past orders, respond using known order info.
- Keep responses polite, short, and relevant (under 20 words).
- If you’re unsure, say: “I’m not sure about that.”

Be concise and helpful."""),
    ("user", "{question}")
])


# Chain without StrOutputParser
chain = prompt | model

# Memory store
store = {}
def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

chat_with_memory = RunnableWithMessageHistory(
    chain, get_session_history, input_messages_key="question"
)

# Request model
class ChatRequest(BaseModel):
    question: str
    email: str
    session_id: str = "default"

# Get user context from MongoDB
def get_user_context(email: str):
    print(f"🔍 Looking up user: {email}")

    user = users_collection.find_one({"email": {"$regex": f"^{email}$", "$options": "i"}})
    print("👤 User found:", user)

    order_doc = orders_collection.find_one({"email": {"$regex": f"^{email}$", "$options": "i"}})
    print("📦 Order document found:", order_doc)

    username = user.get("name", "Customer") if user else email.split("@")[0]

    freq = {}
    if order_doc and "previousorder" in order_doc:
        for order_entry in order_doc["previousorder"]:
            for item in order_entry.get("Myorder", []):
                title = item.get("title", "")
                qty = int(item.get("quantity", 1))  # default quantity = 1
                freq[title] = freq.get(title, 0) + qty

    top_items = sorted(freq.items(), key=lambda x: -x[1])[:3]
    top_names = [item[0] for item in top_items]

    if not top_names:
        print("⚠️ No past orders found, showing fallback items.")
        top_names = ["Steam Momos", "Chicken Biryani", "Paneer Tikka"]

    print("✅ Top ordered items:", top_names)
    return username, top_names

# Main chat endpoint
@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        username, top_items_list = get_user_context(request.email)
        top_items = ", ".join(top_items_list)

        response = await chat_with_memory.ainvoke(
            {
                "question": request.question,
                "username": username,
                "top_items": top_items
            },
            config={"configurable": {"session_id": request.session_id}}
        )

        return {"response": response.content}  # Extract content from AIMessage
    except Exception as e:
        print("Chat Error:", e)
        return {"response": "Oops, something went wrong."}

# Debug DB endpoint
@app.get("/testdb")
async def test_db():
    try:
        orders = list(orders_collection.find())
        users = list(users_collection.find())
        return {
            "orders": orders,
            "users": users
        }
    except Exception as e:
        print("DB Error:", e)
        return {"error": str(e)}
