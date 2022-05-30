import React from "react";
import "./Style.css";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://user-images.githubusercontent.com/38624002/171004645-076d1913-6820-4758-b1b8-23fa482dc1f6.png",
  },
  {
    url: "https://user-images.githubusercontent.com/38624002/171003628-f1102917-7af5-471c-afc1-20a0c793180f.png",
  },
  {
    url: "https://user-images.githubusercontent.com/38624002/171004408-4050e3da-19d6-4903-9ab0-cfba812b4051.png",
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
        autoPlayDelay={10}
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
