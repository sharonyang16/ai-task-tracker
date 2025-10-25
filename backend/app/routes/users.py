from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..services.users import (
    supabase_logout,
    supabase_signup,
    supabase_login,
    supabase_session_check,
    get_user_tasks,
)

router = APIRouter(prefix="/users", tags=["users"])


class AuthRequestBody(BaseModel):
    username: str
    password: str

    def __iter__(self):
        yield self.username
        yield self.password


@router.post("/signup")
async def signup(body: AuthRequestBody):
    try:
        username, password = body
        if not username or not password:
            return JSONResponse(
                status_code=400,
                content={"message": "username and password are required"},
            )

        result = supabase_signup(username, password)
        return result
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.post("/login")
async def login(body: AuthRequestBody):
    try:
        username, password = body
        if not username or not password:
            return JSONResponse(
                status_code=400,
                content={"message": "username and password are required"},
            )

        result = supabase_login(username, password)
        return result
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.post("/logout")
async def logout(request: Request):
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


@router.get("/check-session")
async def check_session(request: Request):
    try:
        bearer_token = request.headers.get("Authorization")
        if not bearer_token:
            return JSONResponse(
                status_code=401,
                content={"message": "Missing Authorization token"},
            )
        result = supabase_session_check(bearer_token)
        return result
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.get("/{uuid}/tasks")
async def get_user_tasks_by_id(uuid: str):
    try:
        return get_user_tasks(uuid)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )
