from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from gemini import items_retrieved_from_image

app = Flask(__name__)

CORS(app)

@app.route("/")
def index():
    return jsonify({"message": "Flask server connected!"}), 200

@app.route("/extract_items_from_menu", methods=["POST","GET"])
def extract_items_from_menu():

    if not request.method == "POST":
        return jsonify({"error": "This route only accepts POST requests."}), 405
    
    uploaded_file = request.files["uploaded_file"]

    if not uploaded_file:
        return jsonify({"error": "No file uploaded."}), 400
    
    try:
        menu = items_retrieved_from_image(Image.open(uploaded_file))
        return jsonify(menu), 200

    except:
        return jsonify({"error": "Please make sure to upload pictures only"}), 500
