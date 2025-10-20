from .supabase import supabase


def get_tasks(uuid):
    response = supabase.from_("tasks").select("*").eq("created_by", uuid).execute()

    for index, task in enumerate(response.data):
        response.data[index]["sub_tasks"] = (
            supabase.from_("sub_tasks")
            .select("*")
            .eq("parent_task_id", task["id"])
            .execute()
        ).data

    return response
