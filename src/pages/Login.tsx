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

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://loopr-backend-bsnk.onrender.com/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid credentials");
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
          Login
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
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>
        <Link
          component={RouterLink}
          to="/register"
          color="primary"
          underline="hover"
          display="block"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Don't have an account? Register
        </Link>

      </Paper>
    </Box>
  );
};

export default Login;

import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
