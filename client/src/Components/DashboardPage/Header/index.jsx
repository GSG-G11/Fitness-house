import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Typography,
  IconButton,
  AppBar as MuiAppBar,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { useGetGymDataQuery } from "../../../Store/Services/gyms";

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
  const { id } = useSelector(({ checkAuth }) => checkAuth.auth);

  const { data, isLoading, isError, isSuccess } = useGetGymDataQuery(id);

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
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Typography variant="body2" noWrap component="div">
            أهلا وسهلا بكم في صفحة الإدارة
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            title="Open settings"
          >
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt={
                  !isLoading && !isError && isSuccess
                    ? data.gymData.gymName
                    : "GymName"
                }
                src={
                  !isLoading && !isError && isSuccess ? data.gymData.logo : ""
                }
              />
            </IconButton>
            <Typography variant="body2" noWrap component="div">
              {!isLoading && !isError && isSuccess
                ? data.gymData.gymName
                : "Loading..."}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};
