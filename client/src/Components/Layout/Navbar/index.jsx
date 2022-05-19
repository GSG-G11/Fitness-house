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

function Navbar() {
  const [searchGyms, setSearchGyms] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [search, setSearch] = useState("");
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleDrawer = () => {
    setIsShowMenu(!isShowMenu);
  };

  const handleSearch = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
    setIsPending(true);

    // send request to server then set searchGyms to the response
    setSearchGyms([
      { id: 1, name: "test 1" },
      { id: 2, name: "test 2" },
    ]);
  };

  const handleBlur = () => {
    setIsPending(false);
    setSearch("");
  };

  const renderSearch = () => {
    return (
      isPending && (
        <ul className="list-search">
          {searchGyms.length > 0 ? (
            searchGyms.map(({ id, name }, index) => (
              <li key={id}>
                <Link to={`/gyms/profile/${id}`} onClick={handleBlur}>
                  {name}
                </Link>
                {index !== searchGyms.length - 1 && <Divider />}
              </li>
            ))
          ) : (
            <li>NotFound Any Gym</li>
          )}
        </ul>
      )
    );
  };

  const listNavbar = [
    { text: "عن فت هاوس", link: "#OfferForYouSection" },
    { text: "أفضل النوادي", link: "#TopRatedGymsSection" },
    { text: "تواصل معنا", link: "#ContactUsSection" },
  ];

  const list = () => (
    <Box
      role="presentation"
      sx={{ width: 250 }}
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
        <ListItem disablePadding>
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
              <li>
                <a className="nav-item" href="#OfferForYouSection">
                  عن فت هاوس
                </a>
              </li>
              <li>|</li>
              <li>
                <a className="nav-item" href="#TopRatedGymsSection">
                  أفضل النوادي
                </a>
              </li>
              <li>|</li>
              <li>
                <a className="nav-item" href="#ContactUsSection">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          <div className="search-container">
            <input
              className="search-input"
              type="search"
              value={search}
              name="search"
              onChange={handleSearch}
              placeholder="ابحث عن طريق اسم النادي أو المدينة"
              autoComplete="off"
            />
            {renderSearch()}
          </div>

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

      <div>
        <div className="sub__container display-raw show-mobile">
          <Link to="/" className="brand-logo">
            فت هاوس
          </Link>

          <div className="search-container">
            <input
              className="search-input"
              type="search"
              value={search}
              name="search"
              onChange={handleSearch}
              placeholder="ابحث عن طريق اسم النادي أو المدينة"
              autoComplete="off"
            />
            {renderSearch()}
          </div>
          <Button onClick={toggleDrawer}>
            <MenuIcon />
          </Button>
        </div>

        <Drawer anchor="right" open={isShowMenu} onClose={toggleDrawer}>
          {list()}
        </Drawer>
      </div>
    </>
  );
}

export default Navbar;
