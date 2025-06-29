import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("https://loopr-backend-bsnk.onrender.com/api/auth/register", {
                email,
                password,
            });

            alert("Registration successful! You can now log in.");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#1E1E2F"
        >
            <Paper sx={{ p: 4, width: 300, backgroundColor: "#2A2A3D" }}>
                <Typography variant="h6" mb={2} color="white" align="center">
                    Register
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{ style: { color: "#aaa" } }}
                    InputProps={{ style: { color: "#fff" } }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{ style: { color: "#aaa" } }}
                    InputProps={{ style: { color: "#fff" } }}
                />
                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
                    Register
                </Button>
                <Link
                    component={RouterLink}
                    to="/login"
                    color="primary"
                    underline="hover" 
                    display="block"
                    textAlign="center"
                    sx={{ mt: 2 }}
                >
                    Already have an account? Login
                </Link>

            </Paper>
        </Box>
    );
};

export default Register;

import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

