from flask import Flask, request, jsonify
import requests, json
import os as env
from utils import extract_lessons
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi


app = Flask(__name__)
CORS(app)


WORKERS_AI_API_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/53b141f9c6a1189fbdbb69c983ffa925/ai/run/"
headers = {"Authorization": f"Bearer {env.getenv('WORKERS_AI_API_TOKEN')}"}
model = "@cf/meta/llama-2-7b-chat-fp16"
speech_recogintion_model = "@cf/openai/whisper"


@app.route("/")
def main():
    return "API running on ..."


@app.route("/api/hello_workers_ai")
def api():
    response = requests.post(
        f"{WORKERS_AI_API_BASE_URL}{model}", 
        headers=headers,
        json={
            "messages": [
                {"role": "system", "content": "You are a friendly assistant"},
                {"role": "user", "content": "Say hello if you are perfectly working. keep it short"}
            ]
        })
    # return response.json()
    cleaned_response = response.json()
    return jsonify(cleaned_response["result"]["response"])


def generate_quizzes_from(lesson):
    response = requests.post(
        f"{WORKERS_AI_API_BASE_URL}{model}", 
        headers=headers,
        json={
            "messages": [
                {"role": "system", "content": "You are a helpfull assistant"},
                {"role": "user", "content": f"Generate one quiz question (QUESTION ONLY) from this lesson: {lesson} . keep it short"}
            ]
        })
    
    print("Quiz creation ...")
    
    cleaned_response = response.json()
    return cleaned_response["result"]["response"]


@app.route("/api/get_transcript", methods=["POST", "GET"])
def get_transcript():
    if request.method == "GET":
        return jsonify({"error": "GET request not allowed"}), 400
    
    data = request.get_json()

    video_id = data.get("video_id")
    transcript = YouTubeTranscriptApi.get_transcript(video_id)

    try:
        return jsonify(transcript), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500



Quizzes = []
Lessons = []

    
    
@app.route("/api/train_ai_with_transcript", methods=["POST", "GET"])
def train_ai_with_transcript():

    if request.method == "GET":
        return jsonify({"error": "GET request not allowed"}), 400

    data = request.get_json()

    Transcript = data.get("transcript")

    try:
        new_transcript = []
        t = json.loads(Transcript)

        if len(t) < 500:
            return jsonify({"res": "No transcript found in session storage"}), 333

        for i in range(500):
            new_transcript.append(t[i]["text"])

        str_transcript = " ".join(new_transcript)

        response = []

        for _ in range(3):
            lesson = extract_lessons(str_transcript)
            quiz = generate_quizzes_from(lesson)

            response.append(lesson)

            Quizzes.append(quiz)
            Lessons.append(lesson)

        print(response)

        return jsonify({"res": response}), 200

    except Exception as e:
        print(f"Error extracting lessons: {e}")
        return jsonify({"error": "Failed to extract lessons"}), 500
    

@app.route("/api/get_quizzes")
def get_quizzes():
    print("seding: ", Quizzes, "and ", Lessons)
    try:
        return jsonify({"quizzes": Quizzes, "lessons": Lessons}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500