import React from "react";
import "./style.css";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import SimpleImageSlider from "react-simple-image-slider";

function GymImages({ gymData }) {
  const { images } = gymData;
  let image = null;
  if (images.length === 0) {
    image = [
      {
        url: gymData.logo,
      },
    ];
  } else {
    image = images.map((e) => {
      return {
        url: e.pathUrl,
      };
    });
  }
  return (
    <Box className="sub__container gym__images">
      <h1 className="imagetitle">صور النادي</h1>
      <div className="container__slider">
        <SimpleImageSlider
          className="slider"
          width="50%"
          loop
          autoPlay
          autoPlayDelay={5.0}
          height={504}
          images={image}
          showBullets
          showNavs
        />
      </div>
    </Box>
  );
}
GymImages.propTypes = {
  gymData: PropTypes.instanceOf(Object).isRequired,
};
export default GymImages;
