from .supabase import supabase


def get_tasks(username):
    response = (
        supabase.from_("tasks").select("*").eq("created_by", username).execute()
    )
    return response
