import google.generativeai as genai
import os as env


genai.configure(api_key=env.getenv('GEMINI_API_KEY'))
model = genai.GenerativeModel("gemini-pro")


def extract_lessons(transcript):

    did_you_know_prompt = f"""
        In the style of a fun and engaging trivia question, tell me one new "Did you know?" informative and interesting facts 
        for learning purpose related to this video, here are the transcript: {transcript}. 
        Use creative analogies or metaphors to explain concepts found in there And make it short.

        DO NOT PUT ANY STYLING ON THE TEXT RESPONSE. ALSO, USE ONLY SINGLE QUOTES
    """

    print("Extracting lessons from transcript...")
    response = model.generate_content(did_you_know_prompt)

    return response.text 