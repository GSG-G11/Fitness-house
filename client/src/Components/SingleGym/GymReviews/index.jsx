import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Rating,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import PropTypes from "prop-types";
import Review from "./Review";
import "./style.css";

function GymReviews({ gymData }) {
  const { reviews } = gymData;
  const [rate, setRate] = useState(0);
  const [username, setUsername] = useState("");
  const [reviewdescription, setReviewDescription] = useState("");
  const [countReviews, setCountReviews] = useState(2);
  const isShowAll = () => {
    return countReviews >= reviews.length;
  };
  return (
    <div className="review">
      <Box className="top-container">
        <Typography>تقييمات المشتركين</Typography>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        {reviews.slice(0, countReviews).map((review) => (
          <Review key={review.id} review={review} />
        ))}
        {!isShowAll() && (
          <Button
            sx={{ mt: ".5rem" }}
            variant="text"
            onClick={() => {
              setCountReviews(countReviews + 2);
            }}
          >
            اعرض المزيد
          </Button>
        )}
      </Box>
      <Stack spacing={0.5}>
        <Typography className="user__name" fontWeight={700} noWrap>
          أضف رايك
        </Typography>
        <Rating
          name="simple-controlled"
          value={rate}
          onChange={(event, newValue) => {
            setRate(newValue);
          }}
        />
        <Box
          className="opinion"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="أدخل اسمك"
            sx={{
              m: 1,
              maxWidth: 600,
            }}
            md={{
              maxWidth: 1000,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="أدخل رايك"
            sx={{
              m: 1,
              maxWidth: 600,
            }}
            md={{
              maxWidth: 1000,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MessageIcon />
                </InputAdornment>
              ),
            }}
            value={reviewdescription}
            onChange={(event) => {
              setReviewDescription(event.target.value);
            }}
            variant="outlined"
          />
          <Button
            sx={{
              m: 1,
              minWidth: 100,
            }}
            variant="contained"
          >
            أضف رايك
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
GymReviews.propTypes = {
  gymData: PropTypes.instanceOf(Object).isRequired,
};

export default GymReviews;
