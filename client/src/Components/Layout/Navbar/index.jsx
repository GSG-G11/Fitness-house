import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

function Navbar() {
  return (
    <nav className="sub__container nav-bar">
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

        <div>
          <input
            type="search"
            placeholder="ابحث عن طريق اسم النادي أو المدينة"
          />
        </div>

        <div className="display-raw">
          <Link to="/gym/register">إنشاء حساب</Link>
          <Link to="/gym/login">تسجيل الدخول</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
