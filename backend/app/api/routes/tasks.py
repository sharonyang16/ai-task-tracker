from typing import Optional
from ..services.tasks import get_tasks, create_new_task
from ..services.recommendations import get_recommendations
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from enum import Enum

router = APIRouter(prefix="/tasks", tags=["tasks"])


class TaskSize(str, Enum):
    SMALL = "SMALL"
    MEDIUM = "MEDIUM"
    LARGE = "LARGE"


class CreateTaskRequestBody(BaseModel):
    title: str
    description: Optional[str] = None
    creator: str
    size: TaskSize

    def __iter__(self):
        yield self.title
        yield self.description
        yield self.size
        yield self.size


@router.get("/")
async def get_all_tasks():
    try:
        return get_tasks()
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.post("/")
async def create_task(body: CreateTaskRequestBody):
    try:
        title, description, creator, size = body
        if not title or not creator or not size:
            return JSONResponse(
                status_code=400,
                content={"message": "title, creator, and size are required"},
            )

        return create_new_task(title, description, creator, size)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.get("/{taskId}/recommendations")
async def get_subtask_recommendations(taskId: int):
    try:
        return {
            "recommendations": get_recommendations(taskId),
        }
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )
