import React from "react";
import "./Style.css";
import SimpleImageSlider from "react-simple-image-slider";

const images = [
  {
    url: "https://user-images.githubusercontent.com/44284483/167286873-7942763b-92e0-4361-b7db-1092848a10fb.png",
  },
  {
    url: "https://user-images.githubusercontent.com/44284483/167286883-7c9be2bc-723b-4506-9596-aea595bf2971.png",
  },
  {
    url: "https://user-images.githubusercontent.com/44284483/167286886-ee544c89-7e6b-4e1c-aada-48d6dab6dbb3.png",
  },
];

const style = window.innerWidth - 85;

function Slider() {
  return (
    <div className="Slider__container">
      <div className="container">
        <div className="slider_row">
          <SimpleImageSlider
            width={style}
            loop
            autoPlay
            autoPlayDelay={5.0}
            height={504}
            images={images}
            showBullets
            showNavs
          />
        </div>
      </div>
    </div>
  );
}
// this is slider
export default Slider;
