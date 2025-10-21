from .supabase import supabase


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
