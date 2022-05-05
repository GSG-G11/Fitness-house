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
    <div className="main-container-footer">
      <div className="footer-container">
        <div className="name-container">
          <span className="name__title">فت هاوس</span>
          <p>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى،
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
        <div className="img-container">
          <img
            src="https://i2-prod.mylondon.news/incoming/article9313114.ece/ALTERNATES/s1200b/Untitled.jpg"
            alt="logo"
          />
        </div>
      </div>
      <div className="copy-right-container">
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
  );
}

export default Footer;
