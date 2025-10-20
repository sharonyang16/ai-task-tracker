from typing import Annotated
from ..services.tasks import get_tasks
from fastapi import APIRouter, Path

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/tasks/{uuid}/", status_code=200)
async def read_path(
    uuid: Annotated[
        str, Path(title="The uuid of the user who created the tasks to get.")
    ],
):
    return get_tasks(uuid)
