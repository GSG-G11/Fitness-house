import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import {
  Toolbar,
  Typography,
  IconButton,
  AppBar as MuiAppBar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { useGetGymDataQuery } from "../../../Store/Services/gyms";
import { setLogout } from "../../../Store/Slices";

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
  const [anchorEl, setAnchorEl] = useState(null);

  const { id } = useSelector(({ checkAuth }) => checkAuth.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isError, isSuccess } = useGetGymDataQuery(id);

  const open = Boolean(anchorEl);
  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/", { replace: true });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
          <button
            type="button"
            className="btn__dropdown__header"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            title="Open settings"
          >
            <Avatar
              alt={
                !isLoading && !isError && isSuccess
                  ? data.gymData.gymName
                  : "GymName"
              }
              src={!isLoading && !isError && isSuccess ? data.gymData.logo : ""}
            />

            <Typography variant="body2" noWrap component="div" color="while">
              {!isLoading && !isError && isSuccess
                ? data.gymData.gymName
                : "Loading..."}
            </Typography>

            <ArrowDropDownIcon />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link to="/">الرئيسية</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={`/gyms/profile/${id}`}>حسابي</Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>تسجيل الخروج</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};
