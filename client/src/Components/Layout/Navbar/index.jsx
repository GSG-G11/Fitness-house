import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import "./style.css";
import CardInputSearch from "./CardInputSearch";

function Navbar() {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleDrawer = () => {
    setIsShowMenu(!isShowMenu);
  };

  const listNavbar = [{ text: "تواصل معنا", link: "#ContactUsSection" }];

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
          <div className="display-raw">
            <Link className="link-auth" to="/gym/register">
              إنشاء حساب
            </Link>
            <Link className="link-auth" to="/gym/login">
              تسجيل الدخول
            </Link>
          </div>
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
              فت هاوس
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

          <div className="display-raw">
            <Link className="link-auth" to="/gym/register">
              إنشاء حساب
            </Link>
            <Link className="link-auth" to="/gym/login">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </nav>

      {/*  For mobile Version */}
      <nav>
        <div className="sub__container display-raw show-mobile">
          <Link to="/" className="brand-logo">
            فت هاوس
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
