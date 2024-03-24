import os as env
import vonage

client = vonage.Client(key=env.getenv("VONAGE_KEY"), secret=env.getenv("VONAGE_SECRET"))
sms = vonage.Sms(client)

responseData = sms.send_message(
    {
        "from": "17707555726",
        "to": "19145103591",
        "text": "Still working",
    }
)

if responseData["messages"][0]["status"] == "0":
    print("Message sent successfully.")
else:
    print(f"Message failed with error: {responseData['messages'][0]['error-text']}")