import google.generativeai as genai
import os as env
import json

genai.configure(api_key=env.getenv("GEMINI_API_KEY"))

model_json_res = genai.GenerativeModel(model_name="gemini-1.5-pro-latest", generation_config={"response_mime_type": "application/json"})

def items_retrieved_from_image(image):
    print("processing ", image)

    prompt = """
        Verify if this picture is a menu and list the items in it using this JSON schema:
        {'type': 'object', 'properties': { 
            'is_menu': {'type': 'boolean'}, 
            'error': {'type': 'string'},
            'restaurant_name': {'type': 'string'}, 
            'menu_items': {'type': 'array', 'menu_items': {
                'categories': {'type': 'string'}, 
                'items': {'type': 'array', 'items': {'type': 'object', 'properties': {
                    'item_name': {'type': 'string'},
                    'item_price': {'type': 'float'},
                    'item_description': {'type': 'string'},
                }}
            }}
        }}
    """

    response = model_json_res.generate_content([prompt, image])
    return json.loads(response.text)