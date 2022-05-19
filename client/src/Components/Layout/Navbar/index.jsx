import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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

  const ref = useRef(null);

  const handleBlur = () => {
    setIsPending(false);
    setSearch("");
  };

  // function to handle Click Outside input search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleBlur();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // function to set Is Show Menu or not
  const toggleDrawer = () => {
    setIsShowMenu(!isShowMenu);
  };

  // function to handle Search and send to API
  const handleSearch = async (event) => {
    setSearch(event.target.value);
    setIsPending(true);

    // send request to server then set searchGyms to the response
    const { data } = await axios({
      method: "get",
      url: `/api/v1/gyms/search?q=${event.target.value}`,
    });

    setSearchGyms(data.slice(Math.max(data.length - 10, 0))); // get the last 10 results
  };

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

  const renderInputSearch = () => {
    return (
      <div className="search-container">
        <input
          ref={ref}
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

      <div>
        <div className="sub__container display-raw show-mobile">
          <Link to="/" className="brand-logo">
            فت هاوس
          </Link>

          <div className="left-nav-mobile">
            {renderInputSearch()}
            <Button onClick={toggleDrawer}>
              <MenuIcon />
            </Button>
          </div>
        </div>

        <Drawer anchor="right" open={isShowMenu} onClose={toggleDrawer}>
          {list()}
        </Drawer>
      </div>
    </>
  );
}

export default Navbar;
