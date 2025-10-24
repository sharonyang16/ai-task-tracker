from .supabase import supabase
from datetime import date


def get_tasks():
    response = supabase.table("tasks").select("*").execute()

    for index, task in enumerate(response.data):
        response.data[index]["sub_tasks"] = (
            supabase.table("sub_tasks")
            .select("*")
            .eq("parent_task_id", task["id"])
            .execute()
        ).data

    return response.data


def create_new_task(title, description, creator, size):
    response = (
        supabase.table("tasks")
        .insert(
            {
                "created_at": date.today().strftime("%Y-%m-%d"),
                "title": title,
                "description": description,
                "created_by": creator,
                "sub_tasks": [],
                "is_complete": False,
                "size": size,
            }
        )
        .execute()
    )

    return response.data[0]


def create_new_subtask(title, description, parentId):
    response = (
        supabase.table("sub_tasks")
        .insert(
            {
                "created_at": date.today().strftime("%Y-%m-%d"),
                "parent_task_id": parentId,
                "title": title,
                "description": description,
                "is_complete": False,
            }
        )
        .execute()
    )

    # Update parent Task
    subtask_id = response.data[0].get("id")
    parent_subtasks_arr = (
        supabase.table("tasks")
        .select("sub_tasks")
        .eq("id", parentId)
        .execute()
        .data[0]
        .get("sub_tasks")
    )
    supabase.table("tasks").update(
        {"sub_tasks": [*parent_subtasks_arr, subtask_id]}
    ).eq("id", parentId).execute()

    return response.data[0]


def get_task_by_id(taskId):
    response = supabase.table("tasks").select("*").eq("id", taskId).execute()

    for index, task in enumerate(response.data):
        response.data[index]["sub_tasks"] = (
            supabase.table("sub_tasks")
            .select("*")
            .eq("parent_task_id", task["id"])
            .execute()
        ).data

    return response.data[0]


def update_task_by_id(taskId, title, description, is_complete, sub_tasks, size):
    data_to_update = {}
    if title:
        data_to_update["title"] = title
    if description:
        data_to_update["description"] = description
    if sub_tasks:
        data_to_update["sub_tasks"] = sub_tasks
    if size:
        data_to_update["size"] = size
    if is_complete is not None:
        data_to_update["is_complete"] = is_complete

    response = supabase.table("tasks").update(data_to_update).eq("id", taskId).execute()
    return response.data[0]


def get_subtask_by_id(taskId):
    response = supabase.table("sub_tasks").select("*").eq("id", taskId).execute()
    return response.data[0]


def update_subtask_by_id(taskId, title, description, is_complete):
    data_to_update = {}
    if title:
        data_to_update["title"] = title
    if description:
        data_to_update["description"] = description
    if is_complete is not None:
        data_to_update["is_complete"] = is_complete

    response = (
        supabase.table("sub_tasks").update(data_to_update).eq("id", taskId).execute()
    )
    return response.data[0]
