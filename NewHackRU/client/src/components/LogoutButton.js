import { useAuth0 } from '@auth0/auth0-react';
import { Button } from "@mui/material";
import { buttonStyle } from './Styling';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <Button style={buttonStyle} variant="contained" onClick={() => logout} startIcon={<LogoutRoundedIcon />}>Sign out</Button>
        )
    );
}


export default LogoutButton;