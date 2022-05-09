import React from "react";
import {
  FaMapMarker,
  FaPhone,
  FaEnvelope,
  FaSkype,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import "./style.css";

function Footer() {
  return (
    <footer>
      <div className="footer_sec_1 container">
        <div className="sub__container">
          <div className="footer-container">
            <div className="name-container">
              <span className="name__title">فت هاوس</span>
              <p>
                فت هاوس هي منصة عربية تساعدك على إيجاد النادي المناسب لك ضمن
                العديد من الأندية المتوفرة على موقعنا، كما ويمكنك من خلالنا حجز
                اشتراك في أي نادي ترغب به.
              </p>
            </div>
            <div className="contact-container">
              <h3 className="contact-title">تواصل معنا</h3>
              <div className="contact-icons">
                <div className="iconDev">
                  <FaMapMarker className="icons" size="1.2em" />
                  <span>غزة - فلسطين</span>
                </div>
                <div className="iconDev">
                  <FaPhone className="icons" size="1.2em" />
                  <span>+972-000000</span>
                </div>
                <div className="iconDev">
                  <a
                    href="mailto:fithouse-gz@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaEnvelope className="icons" size="1.2em" />
                  </a>
                  <span>fithouse-gz@gmail.com</span>
                </div>
                <div className="iconDev">
                  <a
                    href="https://skype.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSkype className="icons" size="1.2em" />
                  </a>
                  <span>fithouse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg__container footer_sec_2 container">
        <div className="bg__container sub__container">
          <div className="copy-right">
            <span> فت هاوس &copy; 2022 </span>
            <div className="social-media">
              <FaFacebook className="icons" size="1.2em" />
              <FaInstagram className="icons" size="1.2em" />
              <FaTwitter className="icons" size="1.2em" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
