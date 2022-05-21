import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import Fade from "@mui/material/Fade";

import { styled } from "@mui/material/styles";
import { Box, Button, CssBaseline } from "@mui/material";

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
  const [isOpen, setIsOpen] = useState(window.innerWidth > 1150);

  const handleDrawer = (statusOpen) => {
    setIsOpen(statusOpen);
  };

  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  const handleDismissAlert = (key) => (
    <Button style={{ color: "#fff" }} onClick={onClickDismiss(key)}>
      إزالة
    </Button>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header isOpen={isOpen} handleDrawer={handleDrawer} />
      <SideBar isOpen={isOpen} handleDrawer={handleDrawer} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <SnackbarProvider
          ref={notistackRef}
          maxSnack={3}
          TransitionComponent={Fade}
          action={handleDismissAlert}
        >
          <Outlet />
        </SnackbarProvider>
      </Box>
    </Box>
  );
}

export default Dashboard;
