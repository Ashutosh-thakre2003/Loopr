import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <Box display="flex">
      <Sidebar />
      <Box flexGrow={1} p={2}>
        <Topbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
