from fastapi import APIRouter

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/tasks/{username}/")
async def read_path(
    username: Annotated[str, Path(title="The username of the user to get.")],
):
    return {"username": username}