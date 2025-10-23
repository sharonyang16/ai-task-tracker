from .supabase import supabase
from datetime import date


def get_tasks():
    response = supabase.from_("tasks").select("*").execute()

    for index, task in enumerate(response.data):
        response.data[index]["sub_tasks"] = (
            supabase.from_("sub_tasks")
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

    return response.data
