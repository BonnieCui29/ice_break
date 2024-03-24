const flask_url = "http://127.0.0.1:5000/api";


export const ValidateLinkInTheBack = async (youtubeLink) => {
    sessionStorage.setItem("youtubeLink", youtubeLink);
    try {
        const response = await fetch(flask_url + "/get_transcript", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ video_id: getIdFrom(youtubeLink) })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.text();
        
        sessionStorage.setItem("transcript", data);

        return true;  

    } catch (error) {
        console.log("Error fetching transcript:", error);
        return false;
    }
};


function getIdFrom(link) {
    return link.split("v=")[1] || null;
};


export const TrainAIWithTranscript = async () => {
    try {
        const transcript = sessionStorage.getItem("transcript");
        if (!transcript) {
            throw new Error("No transcript found in session storage");
        }

        const response = await fetch(flask_url + "/train_ai_with_transcript", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ transcript: transcript })
        });
          

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log("AI trained successfully:", data);
        return true;


    } catch (error) {
        console.log("Error training AI:", error);
        return false;
    }
};