import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Typography,
} from "@mui/material";

import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StarIcon from "@mui/icons-material/Star";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const listItem = [
  {
    text: "بيانات النادي",
    icon: <FitnessCenterIcon />,
    link: "/dashboard/gyms",
  },
  {
    text: "المشتركين",
    icon: <SportsGymnasticsIcon />,
    link: "/dashboard/gyms/subscribers",
  },
  {
    text: "التقيمات",
    icon: <StarIcon />,
    link: "/dashboard/gyms/reviews",
  },
];

export default function SideBar({ isOpen, handleDrawer }) {
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Drawer variant="permanent" sx={{ background: "red" }} open={isOpen}>
      <DrawerHeader>
        <Typography variant="h5" component="div">
          فت هاوس
        </Typography>
        <IconButton onClick={() => handleDrawer(false)}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {listItem.map(({ text, icon, link }) => (
          <Fragment key={text}>
            <ListItem disablePadding sx={{ display: "block" }} title={text}>
              <Link to={link}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: isOpen ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: isOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          </Fragment>
        ))}

        <ListItem
          disablePadding
          sx={{ display: "block", background: "red" }}
          title="تسجيل الخروج"
        >
          <button
            onClick={handleLogout}
            type="button"
            style={{
              width: "100%",
              background: "#ff7e7e",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 3 : "auto",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="تسجيل الخروج"
                sx={{ opacity: isOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </button>
        </ListItem>
      </List>
    </Drawer>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};
