import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CardInputSearch from "./CardInputSearch";
import "./style.css";
import { setLogout } from "../../../Store/Slices";

function Navbar() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const { id, name, isLoggedIn } = useSelector(
    ({ checkAuth }) => checkAuth.auth
  );

  const toggleDrawer = () => {
    setIsShowMenu(!isShowMenu);
  };

  const handleClick = ({ currentTarget }) => {
    setAnchorEl(currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(setLogout());
  };

  const listNavbar = [{ text: "تواصل معنا", link: "#ContactUsSection" }];

  const authCard = () => (
    <div className="display-raw">
      {isLoggedIn ? (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {name}
            <ArrowDropDownIcon />
          </Button>
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
              <Link to="/dashboard/gyms">لوحة التحكم</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to={`/gyms/profile/${id}`}>حسابي</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>تسجيل الخروج</MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Link className="link-auth" to="/gym/register">
            إنشاء حساب
          </Link>
          <Link className="link-auth" to="/gym/login">
            تسجيل الدخول
          </Link>
        </>
      )}
    </div>
  );

  const list = () => (
    <Box
      role="presentation"
      sx={{ width: 250, display: "flex", flexDirection: "column" }}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {listNavbar.map(({ link, text }) => (
          <ListItem key={link} disablePadding>
            <ListItemButton>
              <a className="nav-item" href={link}>
                {text}
              </a>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        <ListItem
          disablePadding
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: 2,
          }}
        >
          {authCard()}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <nav className="sub__container nav-bar hide-mobile">
        <div className="display-raw">
          <div className="display-raw">
            <Link to="/" className="brand-logo">
              <Avatar
                alt="logo"
                src="/logo.png"
                sx={{ width: "100%", height: 35, borderRadius: 0 }}
              />
            </Link>
            <ul className="display-raw nav-list">
              {listNavbar.map(({ link, text }) => (
                <li key={link}>
                  <a className="nav-item" href={link}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <CardInputSearch />

          {authCard()}
        </div>
      </nav>

      {/*  For mobile Version  */}
      <nav>
        <div className="sub__container display-raw show-mobile">
          <Link to="/" className="brand-logo">
            <Avatar
              alt="logo"
              src="/logo.png"
              sx={{ width: "100%", height: 35, borderRadius: 0 }}
            />
          </Link>

          <div className="left-nav-mobile">
            <CardInputSearch />
            <Button onClick={toggleDrawer} sx={{ ml: 1 }}>
              <MenuIcon />
            </Button>
          </div>
        </div>

        <Drawer anchor="right" open={isShowMenu} onClose={toggleDrawer}>
          {list()}
        </Drawer>
      </nav>
    </>
  );
}

export default Navbar;
