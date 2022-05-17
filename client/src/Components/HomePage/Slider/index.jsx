import React from "react";
import "./Style.css";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://bit.ly/3skUbkM",
  },
  {
    url: "https://bit.ly/3siJZsQ",
  },
  {
    url: "https://bit.ly/3KVru4l",
  },
  {
    url: "https://bit.ly/3vUpdCn",
  },
];

function Slider() {
  return (
    <div className="container__slider">
      <SimpleImageSlider
        className="slider"
        width="100%"
        loop
        autoPlay
        autoPlayDelay={5.0}
        height={504}
        images={images}
        showBullets
        showNavs
      />
      <div className="background" />
    </div>
  );
}
// this is slider
export default Slider;
