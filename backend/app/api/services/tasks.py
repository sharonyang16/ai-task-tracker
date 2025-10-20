from .supabase import supabase


def get_tasks(uuid):
    response = (
        supabase.from_("tasks").select("*").eq("created_by", uuid).execute()
    )
    return response
