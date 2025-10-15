from fastapi import FastAPI
from api.routes.users import router as users_router

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(users_router)
