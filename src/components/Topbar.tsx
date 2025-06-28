import React from "react";
import {
  Box,
  InputBase,
  IconButton,
  Avatar,
  Button,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";

const Topbar: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
    >
      {/*Search*/}
      <Box
        display="flex"
        alignItems="center"
        bgcolor={theme.palette.background.paper}
        px={2}
        py={1}
        borderRadius="8px"
        width="300px"
      >
        <SearchIcon sx={{ mr: 1, color: "gray" }} />
        <InputBase placeholder="Search..." fullWidth />
      </Box>

      {/* Right side: Notification + Avatar + Logout */}
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton>

          <Link to="/messages" style={{ color: "inherit", textDecoration: "none" }}>
            <NotificationsIcon sx={{ cursor: "pointer" }} />
          </Link>

        </IconButton>
        <Link to="/personal" style={{ color: "inherit", textDecoration: "none" }}>
          <Avatar
            alt="User"
            src="https://i.pravatar.cc/150?img=12"
            sx={{ width: 36, height: 36 }}
          />          </Link>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};




export default Topbar;
