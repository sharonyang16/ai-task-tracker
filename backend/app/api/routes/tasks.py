from typing import Annotated
from ..services.tasks import get_tasks
from fastapi import APIRouter, Path

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/tasks/{username}/")
async def read_path(
    username: Annotated[
        str, Path(title="The username of who created the tasks to get.")
    ],
):
    return get_tasks(username)
