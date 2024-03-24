import { Stack, TextField, Button } from "@mui/material";
import { buttonStyle } from "../components/Styling";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import TrashRoundedIcon from '@mui/icons-material/DeleteRounded';

const Settings = () => {
    return (
        <div>
            <Stack spacing={4}>
                <TextField type="text" label="Username" value="Maminiaina Ravaloarison" />
                <TextField type="text" label="Phone Number" value="+1 914 510 3591" />
                <Stack direction="row" spacing={4}>
                    <Button variant="contained" style={buttonStyle} startIcon={<SaveRoundedIcon />}>Save</Button>
                    <Button style={buttonStyle} color="error" startIcon={<TrashRoundedIcon />}>Delete Account</Button>
                </Stack>
            </Stack>
        </div>
    );
}

export default Settings;