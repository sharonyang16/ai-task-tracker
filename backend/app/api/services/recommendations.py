import os
from dotenv import load_dotenv
from google import genai

load_dotenv()  

gemini_api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=gemini_api_key)

def get_recommendations(task): 
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=f"Create 3 small sub-tasks recommendations for this larger task: {task}; seperate each task using this delimiter: |:|",
    )

    recommended_tasks = response.candidates[0].content.parts[0].text.split("|:|")

    return recommended_tasks
