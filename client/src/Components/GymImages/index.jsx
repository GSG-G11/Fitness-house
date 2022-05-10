// import React from "react";
// import "./style.css";
// import PropTypes from "prop-types";

// function GymImages({ images }) {
//   const first = images[0].pathUrl;
//   return (
//     <div className="sub__container">
//       <h1 className="imagetitle">صور النادي</h1>
//       <div className="gym__images">
//         <div className="right-img">
//           <img src={first} alt="gym" />
//         </div>
//         <div className="left-images">
//           <div className="rightsecc">
//             <img src={first} alt="gym" />
//             <img src={first} alt="gym" />
//           </div>
//           <div className="leftsecc">
//             <img src={first} alt="gym" />
//             <img src={first} alt="gym" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// GymImages.propTypes = {
//   images: PropTypes.instanceOf(Object).isRequired,
// };
// export default GymImages;

import React from "react";
import "./style.css";
import { Box, Grid, Card, CardMedia } from "@mui/material";
import PropTypes from "prop-types";

function GymImages({ images }) {
  return (
    <Box className="sub__container gym__images">
      <h1 className="imagetitle">صور النادي</h1>
      <Grid container spacing={2}>
        <Grid style={{ height: "500px" }} item xs={12} md={6}>
          <Grid style={{ height: "100%" }} item xs={12}>
            <Card style={{ height: "97%" }}>
              <CardMedia style={{ height: "100%" }} image={images[0].pathUrl} />
            </Card>
          </Grid>
        </Grid>
        {/* ------  */}

        <Grid style={{ height: "500px" }} item xs={12} md={6}>
          <Grid style={{ height: "100%" }} container spacing={2}>
            <Grid style={{ height: "50%" }} item xs={12} md={6}>
              <Card style={{ height: "100%" }}>
                <CardMedia
                  style={{ height: "100%" }}
                  image={images[1].pathUrl}
                />
              </Card>
            </Grid>
            <Grid style={{ height: "50%" }} item xs={12} md={6}>
              <Card style={{ height: "100%" }}>
                <CardMedia
                  style={{ height: "100%" }}
                  image={images[2].pathUrl}
                />
              </Card>
            </Grid>
            <Grid style={{ height: "50%" }} item xs={12} md={6}>
              <Card style={{ height: "100%" }}>
                <CardMedia
                  style={{ height: "100%" }}
                  image={images[3].pathUrl}
                />
              </Card>
            </Grid>
            <Grid style={{ height: "50%" }} item xs={12} md={6}>
              <Card style={{ height: "100%" }}>
                <CardMedia
                  style={{ height: "100%" }}
                  image={images[4].pathUrl}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
GymImages.propTypes = {
  images: PropTypes.instanceOf(Object).isRequired,
};
export default GymImages;
