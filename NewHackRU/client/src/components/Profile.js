import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Typography, Stack } from '@mui/material';


const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <Stack direction="row" spacing={2}>
                {user?.picture && <Avatar alt={user.name} src={user.picture} />}
                <Typography variant="h6">{user?.nickname}</Typography>
            </Stack>
        )
    );
}


export default Profile;