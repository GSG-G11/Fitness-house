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
import MessageIcon from "@mui/icons-material/Message";
import Review from "./Review";
import "./style.css";

function GymReviews() {
  const [reviews] = useState([
    {
      id: 1,
      rate: 5,
      description: "نادي رائع جدا, ومريح",
      createdAt: "2022-05-08T14:15:25.266Z",
      userId: 1,
      username: "محمود علي",
      avatar: "https://bit.ly/37THiXV",
    },
    {
      id: 2,
      rate: 4,
      description: "نادي رائع جدا, ومريح",
      createdAt: "2022-05-08T14:15:25.266Z",
      userId: 2,
      username: "علي محمود",
      avatar: "https://bit.ly/3EYZU4G",
    },
    {
      id: 3,
      rate: 3,
      description: "نادي رائع جدا, لكن الملعب كان غير نظيف",
      createdAt: "2022-05-08T14:15:25.266Z",
      userId: 3,
      username: "حسن عبدالله",
      avatar: "https://bit.ly/38CU9xq",
    },
    {
      id: 4,
      rate: 4,
      description: "نادي رائع جدا, ومريح",
      createdAt: "2022-05-08T14:15:25.266Z",
      userId: 2,
      username: "علي محمود",
      avatar: "https://bit.ly/3EYZU4G",
    },
    {
      id: 5,
      rate: 3,
      description: "نادي رائع جدا, لكن الملعب كان غير نظيف",
      createdAt: "2022-05-08T14:15:25.266Z",
      userId: 3,
      username: "حسن عبدالله",
      avatar: "https://bit.ly/38CU9xq",
    },
  ]);
  const [rate, setRate] = useState(0);
  const [reviewdescription, setReviewDescription] = useState("");
  const [countReviews, setCountReviews] = useState(2);

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
        <Button
          variant="text"
          onClick={() => {
            setCountReviews(countReviews + 2);
          }}
        >
          اعرض المزيد
        </Button>
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
            id="outlined-basic"
            label="أدخل رايك"
            sx={{
              maxWidth: 600,
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
          <Button variant="contained">أضف رايك</Button>
        </Box>
      </Stack>
    </div>
  );
}

export default GymReviews;
