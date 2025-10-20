from fastapi import FastAPI
from api.routes.users import router as users_router
from api.routes.recommendations import router as recommendations_router
from api.routes.tasks import router as tasks_router

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


app.include_router(users_router)
app.include_router(recommendations_router)
app.include_router(tasks_router)
