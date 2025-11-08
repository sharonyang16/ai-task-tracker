from typing import Annotated, Optional
from app.services.tasks import (
    get_tasks,
    create_new_task,
    create_new_subtask,
    get_task_by_id,
    update_task_by_id,
    get_subtask_by_id,
    update_subtask_by_id,
    delete_task_by_id,
    delete_subtask_by_id,
)
from app.services.recommendations import get_recommendations, get_recommendation
from fastapi import APIRouter, Query
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

    def __iter__(self):
        yield self.title
        yield self.description


class CreateParentTaskRequestBody(CreateTaskRequestBody):
    creator: str
    size: TaskSize

    def __iter__(self):
        yield from super().__iter__()
        yield self.creator
        yield self.size


class UpdateTaskRequestBody(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_complete: Optional[bool] = None

    def __iter__(self):
        yield self.title
        yield self.description
        yield self.is_complete


class UpdateParentTaskRequestBody(UpdateTaskRequestBody):
    sub_tasks: Optional[list[int]] = None
    size: Optional[TaskSize] = None

    def __iter__(self):
        yield from super().__iter__()
        yield self.sub_tasks
        yield self.size


class RecommendationFilterParams(BaseModel):
    category: str


@router.get("/recommendation")
async def get_task_recommendation(
    filter: Annotated[RecommendationFilterParams, Query()],
):
    try:
        category = filter.category
        return get_recommendation(category)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


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
async def create_task(body: CreateParentTaskRequestBody):
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


@router.get("/{taskId}")
async def get_task(taskId: int):
    try:
        return get_task_by_id(taskId)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.patch("/{taskId}")
async def update_task(taskId: int, body: UpdateParentTaskRequestBody):
    try:
        title, description, is_complete, sub_tasks, size = body
        return update_task_by_id(
            taskId, title, description, is_complete, sub_tasks, size
        )
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.delete("/{taskId}")
async def delete_task(taskId: int):
    try:
        return delete_task_by_id(taskId)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.post("/{taskId}/subtask")
async def create_subtask(taskId: int, body: CreateTaskRequestBody):
    try:
        title, description = body
        if not title:
            return JSONResponse(
                status_code=400,
                content={"message": "title is required"},
            )

        return create_new_subtask(title, description, taskId)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.get("/subtasks/{taskId}")
async def get_subtask(taskId: int):
    try:
        return get_subtask_by_id(taskId)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.patch("/subtasks/{taskId}")
async def update_subtask(taskId: int, body: UpdateTaskRequestBody):
    try:
        title, description, is_complete = body
        return update_subtask_by_id(taskId, title, description, is_complete)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.delete("/subtasks/{taskId}")
async def delete_subtask(taskId: int):
    try:
        return delete_subtask_by_id(taskId)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )


@router.get("/{taskId}/recommendations")
async def get_subtask_recommendations(taskId: int):
    try:
        return get_recommendations(taskId)
    except Exception as e:
        return JSONResponse(
            status_code=400,
            content={"message": str(e)},
        )
