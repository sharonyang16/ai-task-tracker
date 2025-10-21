from typing import Annotated
from fastapi import APIRouter, Path, Request
from fastapi.responses import JSONResponse
from ..services.users import supabase_logout, supabase_signup, supabase_login

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/users/")
def get_users():
    return [{"username": "john"}, {"username": "todd"}]


@router.get("/user/{username}/")
async def read_path(
    username: Annotated[str, Path(title="The username of the user to get.")],
):
    return {"username": username}


@router.post("/signup")
async def signup(username: str, password: str):
    try:
        result = supabase_signup(username, password)
        return result
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.post("/login")
async def login(username: str, password: str):
    try:
        result = supabase_login(username, password)
        return result
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.post("/logout")
async def login(request: Request):
    try:
        bearer_token = request.headers.get("Authorization")
        if not bearer_token:
            return JSONResponse(
                status_code=401,
                content={"message": "Missing Authorization token"},
            )
        result = supabase_logout(bearer_token)
        return result
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )
