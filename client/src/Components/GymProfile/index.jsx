import * as React from "react";
import {
  CardContent,
  Avatar,
  Box,
  Chip,
  Stack,
  Divider,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

function GymProfile({ gymData }) {
  const { logo, images, gymName, city, description, features, progress } =
    gymData;

  return (
    <div className="gymprofilecard">
      <div className="rightside">
        <img src={images[0].pathUrl} alt="gym" />
      </div>
      <Divider variant="middle" />

      <div className="leftside">
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Avatar alt="card" src={logo} />
            <Stack spacing={0.5}>
              <Typography className="gymCard__name" fontWeight={700} noWrap>
                {gymName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {city}
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              marginLeft: 0,
              position: "relative",
              display: "inline-flex",
            }}
          >
            <CircularProgress variant="determinate" value={progress} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                height: 40,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {progress}%
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Typography gutterBottom variant="body1">
            المزايا
          </Typography>
          <Stack direction="row" spacing={1}>
            {features.map((feature) => (
              <Chip key={feature} variant="outlined" label={feature} />
            ))}
          </Stack>
        </Box>
        <Box sx={{ mt: "auto", ml: 2, mb: 2 }}>
          <Link to="/gyms/profile/2">
            <Button variant="contained">احجز موعد</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}
GymProfile.propTypes = {
  gymData: PropTypes.instanceOf(Object).isRequired,
};
export default GymProfile;
