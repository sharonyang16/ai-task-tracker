from app.utils.supabase import supabase


def supabase_signup(username: str, password: str):
    user = supabase.auth.sign_up({"email": username, "password": password})
    return user


def supabase_login(username: str, password: str):
    user = supabase.auth.sign_in_with_password(
        {"email": username, "password": password}
    )
    return user


def supabase_logout(bearer_token: str):
    result = supabase.auth.admin.sign_out(bearer_token)
    return result


def supabase_session_check(bearer_token: str):
    result = supabase.auth.get_user(bearer_token)
    return result


def get_user_tasks(uuid: str):
    response = supabase.from_("tasks").select("*").eq("created_by", uuid).execute()

    for index, task in enumerate(response.data):
        response.data[index]["sub_tasks"] = (
            supabase.from_("sub_tasks")
            .select("*")
            .eq("parent_task_id", task["id"])
            .execute()
        ).data

    return response.data
