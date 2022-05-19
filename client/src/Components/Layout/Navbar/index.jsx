import React from "react";
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

import useNavBar from "../../../Hooks/useNavBar";

import "./style.css";

function Navbar() {
  const {
    searchGyms,
    isPending,
    search,
    isShowMenu,
    toggleDrawer,
    handleSearch,
    ref,
    handleBlur,
  } = useNavBar();

  const listNavbar = [
    { text: "عن فت هاوس", link: "#OfferForYouSection" },
    { text: "أفضل النوادي", link: "#TopRatedGymsSection" },
    { text: "تواصل معنا", link: "#ContactUsSection" },
  ];

  const renderSearch = () => {
    return (
      isPending && (
        <ul className="list-search">
          {searchGyms.length > 0 ? (
            searchGyms.map(({ id, gymName }, index) => (
              <li key={id}>
                <Link to={`/gyms/profile/${id}`} onClick={handleBlur}>
                  {gymName}
                </Link>
                {index !== searchGyms.length - 1 && <Divider />}
              </li>
            ))
          ) : (
            <li>
              <button type="button" onClick={handleBlur}>
                لا يوجد أي نوادي
              </button>
            </li>
          )}
        </ul>
      )
    );
  };

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

  const renderInputSearch = () => {
    return (
      <div className="search-container" ref={ref}>
        <input
          className="search-input"
          type="search"
          value={search}
          name="search"
          onChange={handleSearch}
          placeholder="ابحث عن طريق اسم النادي "
          autoComplete="off"
          onClose={handleBlur}
        />
        {renderSearch()}
      </div>
    );
  };

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

          {renderInputSearch()}

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
            {renderInputSearch()}
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
