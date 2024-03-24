import React, { useState } from "react";
import { ValidateLinkInTheBack, TrainAIWithTranscript } from "../helpers";
import { Stack, TextField, Button, Alert } from "@mui/material";
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { buttonStyle } from "../components/Styling";

const Home = () => {
    const [youtubeLink, setYoutubeLink] = useState(sessionStorage.getItem("youtubeLink"));
    const [isLoading, setIsLoading] = useState(false);
    const [isTrainingDone, setIsTrainingDone] = useState(false);

    const sendLinkToBack = async () => {
        setIsLoading(true);
        setIsTrainingDone(false);
        const isLinkValid = await ValidateLinkInTheBack(youtubeLink);

        if (isLinkValid) {
            await TrainAIWithTranscript();
            setIsLoading(false);
            setIsTrainingDone(true);
        } else {
            setIsLoading(false);
            setIsTrainingDone(true);
            console.log("Invalid link");
        }
    };

    return (
        <div>
            <Stack direction="column" justifyContent="space-between" alignContent="center" spacing={4} paddingBottom={2}>

            <TextField 
                type="text"
                label="Enter your Youtube link"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <Stack justifyContent="center" alignContent="center" alignItems="center">
                <Button style={buttonStyle}
                    startIcon={isLoading ? <CircularProgress color='inherit' size={20} /> : <SmartToyRoundedIcon />}
                    disabled={isLoading}
                    onClick={sendLinkToBack}
                >
                    Train AI
                </Button>
            </Stack>
            {isTrainingDone && <Alert severity="info">Training done! Head over to your Quizzes to have some fun</Alert>}
            </Stack>
        </div>
    );
}

export default Home;