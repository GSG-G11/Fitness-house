/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  IconButton,
  AppBar as MuiAppBar,
  Box,
  // Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./style.css";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ isOpen, handleDrawer }) {
  return (
    <AppBar position="fixed" open={isOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawer(true)}
          edge="start"
          sx={{
            marginRight: 5,
            ...(isOpen && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", flexGrow: 1 }}
        >
          <Typography variant="h6" noWrap component="div">
            أهلا وسهلا بكم في صفحة الإدارة
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            title="Open settings"
          >
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="username" src="/static/images/avatar/2.jpg" />
            </IconButton>
            <Typography variant="body2" noWrap component="div">
              username
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.prototype = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};
