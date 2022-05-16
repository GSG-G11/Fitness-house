import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import { Header, SideBar } from "../Components";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawer = (statusOpen) => {
    setIsOpen(statusOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header isOpen={isOpen} handleDrawer={handleDrawer} />
      <SideBar isOpen={isOpen} handleDrawer={handleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;
