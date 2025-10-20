from typing import Annotated
from fastapi import APIRouter, Path

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/users/")
def get_users():
    return [{"username": "john"}, {"username": "todd"}]

@router.get("/user/{username}/")
async def read_path(
    username: Annotated[str, Path(title="The username of the user to get.")],
):
    return {"username": username}