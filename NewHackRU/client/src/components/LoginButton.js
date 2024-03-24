import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@mui/material";
import { buttonStyle } from './Styling';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    
    return (
        !isAuthenticated && (
            <Button style={buttonStyle} variant="contained" onClick={() => loginWithRedirect()} startIcon={<LoginRoundedIcon />}>Sign in</Button>
        )
    );
}

export default LoginButton;