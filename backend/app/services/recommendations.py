import os
from dotenv import load_dotenv
from google import genai
from app.utils.supabase import supabase

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=gemini_api_key)


def get_recommendations(taskId):
    sb_response = (
        supabase.from_("tasks").select("title, description").eq("id", taskId).execute()
    )

    try:
        data = sb_response.data[0]

        ai_response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=f"Create 3 small sub-tasks recommendations for this larger task: {data["title"]} - {data["description"]} with a title and description for each task; seperate the title and description using this delimiter: |&| and start each task on a new line  -- do not number or label the tasks, add any headers, or add filler text",
        )

        recommended_tasks = ai_response.candidates[0].content.parts[0].text.split("\n")

        for index, task in enumerate(recommended_tasks):
            parts = task.split("|&|")

            recommended_tasks[index] = {
                "title": parts[0].strip(),
                "description": parts[1].strip(),
            }

        return recommended_tasks
    except IndexError:
        return []
