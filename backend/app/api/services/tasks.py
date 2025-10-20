from .supabase import supabase


def get_tasks(uuid):
    response = supabase.from_("tasks").select("*").eq("created_by", uuid).execute()
    return response


def get_sub_tasks(id):
    response = (
        supabase.from_("sub_tasks").select("*").eq("parent_task_id", id).execute()
    )
    return response
