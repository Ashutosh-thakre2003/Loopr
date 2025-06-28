import React from "react";
import {
    Avatar,
    Box,
    Typography,
    Paper,
    Divider,
} from "@mui/material";

const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    joined: "2024-11-15",
    role: "User",
};

const PersonalPage: React.FC = () => {
    return (
        <Box>
            <Typography variant="h5" mb={3} color="white">
                Personal Information
            </Typography>

            <Paper sx={{ p: 3, bgcolor: "#1e1e2f", color: "white" }}>
                {/* Avatar and Info */}
                <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
                    <Avatar sx={{ width: 80, height: 80 }}>
                        {user.name[0]}
                    </Avatar>
                    <Box>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography variant="body2" color="gray">
                            {user.email}
                        </Typography>
                        <Typography variant="body2" color="gray">
                            Joined on {new Date(user.joined).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3, bgcolor: "#333" }} />

                {/* Role & ID Section */}
                <Box display="flex" flexWrap="wrap" gap={4}>
                    <Box flex="1 1 200px">
                        <Typography variant="subtitle2" color="gray">
                            Role
                        </Typography>
                        <Typography>{user.role}</Typography>
                    </Box>

                    <Box flex="1 1 200px">
                        <Typography variant="subtitle2" color="gray">
                            User ID
                        </Typography>
                        <Typography>U-9843</Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default PersonalPage;
