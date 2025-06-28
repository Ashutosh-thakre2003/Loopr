import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Transactions", icon: <ListAltIcon />, path: "/transactions" },
  { text: "Wallet", icon: <AccountBalanceWalletIcon />, path: "/wallet" },
  { text: "Analytics", icon: <InsertChartIcon />, path: "/analytics" },
  { text: "Personal", icon: <PersonIcon />, path: "/personal" },
  { text: "Message", icon: <MailIcon />, path: "/messages" },
  { text: "Setting", icon: <SettingsIcon />, path: "/settings" },
];

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#1A1A2E",
        color: "white",
        p: 2,
      }}
    >
      <Box mb={4} textAlign="center">
        <Typography variant="h5" fontWeight="bold" color="primary">
          Loopr Project
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                "&:hover": {
                  backgroundColor: "#16213E",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
