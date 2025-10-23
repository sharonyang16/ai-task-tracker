from typing import Annotated, Optional
from ..services.tasks import get_tasks, create_new_task
from fastapi import APIRouter, Path
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


@router.get("/tasks/{uuid}", status_code=200)
async def read_path(
    uuid: Annotated[
        str, Path(title="The uuid of the user who created the tasks to get.")
    ],
):
    return get_tasks(uuid)


@router.post("/create-task")
async def create_task(body: CreateTaskRequestBody):
    try:
        title = body.title
        description = body.description
        creator = body.creator
        size = body.size
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
