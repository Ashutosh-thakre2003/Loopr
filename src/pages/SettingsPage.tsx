import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  Button,
} from "@mui/material";

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode] = useState(true); // fixed for now
  const [privacy, setPrivacy] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Box>
      <Typography variant="h5" mb={3} color="white">
        Settings
      </Typography>

      <Paper sx={{ p: 3, bgcolor: "#1e1e2f", color: "white" }}>
        <Typography variant="h6" gutterBottom>
          Preferences
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={darkMode} disabled />
            }
            label="Dark Mode"
          />
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
            }
            label="Enable Notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={privacy}
                onChange={() => setPrivacy(!privacy)}
              />
            }
            label="Private Account"
          />
        </FormGroup>

        <Divider sx={{ my: 3, bgcolor: "#333" }} />

        <Typography variant="h6" gutterBottom>
          Account
        </Typography>

        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default SettingsPage;
