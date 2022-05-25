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
} from "@mui/material";
import PropTypes from "prop-types";
import "./style.css";
import Modal from "../Modal";

function GymProfile({ gymData }) {
  const {
    logo,
    gymName,
    city,
    description,
    features,
    review,
    monthlyPrice,
    sixMonthPrice,
    typeGender,
    phone,
    fulltime,
  } = gymData;
  const percent = (Math.floor(+review) / 5) * 100;
  let gender = "";
  let avalabilty = "";
  if (typeGender === "male") {
    gender = "هذا النادي للذكور فقط";
  } else if (typeGender === "female") {
    gender = "هذا النادي للإناث فقط";
  } else {
    gender = "هذا النادي للإناث والذكور معاً";
  }
  if (fulltime === true) {
    avalabilty = "النادي مفتوح جميع أيام الأسبوع";
  } else {
    avalabilty = "النادي مغلق في أيام الإجازات";
  }
  console.log(gymData);
  return (
    <div className="gymprofilecard">
      <div className="rightside">
        <img src={logo} alt="gym" />
      </div>
      <Divider variant="middle" />

      <div className="leftside">
        <div className="topsec">
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Avatar alt="card" src={logo} />
              <Stack spacing={0.5}>
                <Typography className="gymCard__name" fontWeight={700} noWrap>
                  {gymName}
                </Typography>
                <div className="phonee">
                  <Typography variant="subtitle1" color="text.secondary">
                    {city}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    - {phone}
                  </Typography>
                </div>
              </Stack>
            </Box>

            <Box
              sx={{
                marginLeft: 0,
                position: "relative",
                display: "inline-flex",
              }}
            >
              <CircularProgress variant="determinate" value={percent} />
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
                  {percent}%
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>

        <CardContent>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "right",
              gap: "15px",
            }}
          >
            <span className="description"> {description}</span>
            <span className="typeGender"> {gender}</span>
            <span className="avalabilty"> {avalabilty}</span>
            <span className="monthlyPrice">
              سعر الإشتراك الشهري : {monthlyPrice}
            </span>
            <span className="sixMonthPrice">
              سعر إشتراك الستة أشهر : {sixMonthPrice}
            </span>
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
          <Modal />
        </Box>
      </div>
    </div>
  );
}
GymProfile.propTypes = {
  gymData: PropTypes.instanceOf(Object).isRequired,
};
export default GymProfile;
