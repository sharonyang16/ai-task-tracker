from typing import Annotated
from fastapi import APIRouter, Path
from ..services.recommendations import get_recommendations

router = APIRouter(prefix="/recommendations", tags=["recommendations"])


@router.get("/recommendations/{taskId}/")
async def read_path(
    taskId: Annotated[
        int,
        Path(
            title="The id of the task sub-task recommendations are being generated for."
        ),
    ],
):
    return {
        "taskId": taskId,
        "recommendations": get_recommendations("Build a portfolio website"),
    }
