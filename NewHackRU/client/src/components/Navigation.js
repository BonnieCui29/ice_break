import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";
import Profile from "../components/Profile";
import { Stack, Button } from "@mui/material";
import { buttonStyle } from "./Styling";


const removeAllDecoration = {
    textDecoration: "none",
    color: "black"
};

const Navigation = () => {

    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/quizzes", text: "Quizzes" },
        { to: "/settings", text: "Settings" }
    ];

    const navLinksJSX = navLinks.map((link, index) => {
        return (
            <Link key={index} style={removeAllDecoration} to={link.to}>
                <Button style={buttonStyle} variant="tertiary">
                    {link.text}
                </Button>
            </Link>
        );
    });

    const navToRender = (
        <Stack direction="row" spacing={2}>
            {navLinksJSX}
        </Stack>
    );

    return (
        <Stack direction="row" justifyContent="space-between" alignContent="center" alignItems="center" paddingTop={2} paddingBottom={2}>
            <Stack direction="row" justifyContent="space-between" alignContent="center" padding={2}>
                <Link style={removeAllDecoration} to="/">
                    <Profile />
                </Link>
            </Stack>

            <Stack direction="row" spacing={2}>
                {navToRender}
                <LoginButton />
                <LogoutButton />
            </Stack>
        </Stack>
    );
}

export default Navigation;