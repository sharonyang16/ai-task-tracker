from typing import Annotated
from ..services.tasks import get_tasks, get_sub_tasks
from fastapi import APIRouter, Path

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/tasks/{uuid}/")
async def read_path(
    uuid: Annotated[
        str, Path(title="The uuid of the user who created the tasks to get.")
    ],
):
    return get_tasks(uuid)


@router.get("/sub-tasks/{id}/")
async def read_path(
    id: Annotated[str, Path(title="The id of parent task of the sub-tasks to get.")],
):
    return get_sub_tasks(id)
