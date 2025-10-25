import os
from dotenv import load_dotenv
from app.routes.users import router as users_router
from app.routes.tasks import router as tasks_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

cilent_url: str = os.getenv("CLIENT_URL")

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


origins = ["http://localhost:8081"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(tasks_router)
