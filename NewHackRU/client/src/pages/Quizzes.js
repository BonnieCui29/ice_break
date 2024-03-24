import React, { useState } from "react";
import { buttonStyle } from "../components/Styling";
import { Button, Typography, Stack } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import RefreshIcon from '@mui/icons-material/Refresh';



const Quizzes = () => {
    const [quizzes, setQuizzes] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const reloadData = () => {
        setIsDataLoaded(true);
        fetch("http://127.0.0.1:5000/api/get_quizzes")
            .then((response) => response.json())
            .then((data) => {
                try {
                    setQuizzes(data.quizzes);
                }
                catch (error) {
                    console.log("Error parsing JSON data:", error);
                }
                setIsDataLoaded(false);
            });
    }

    return (
        <div>
            <Stack alignContent="center" justifyContent="center" alignItems="center">
                <Button style={buttonStyle} 
                    disabled={isDataLoaded}
                    startIcon={isDataLoaded ? <CircularProgress color='inherit' size={20} /> : <RefreshIcon />}
                    onClick={reloadData}
                    sx={{ maxWidth: "200px" }}
                >
                    Reload data
                </Button>
            </Stack>

            {isDataLoaded && <p>Loading...</p>}
            <ul>
                {quizzes && quizzes.map((quiz, index) => {
                    return (
                        <li key={index}>
                            <Typography variant="h6">{quiz}</Typography>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Quizzes;