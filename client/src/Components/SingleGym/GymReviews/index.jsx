import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Rating,
  TextField,
  InputAdornment,
  Button,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Review from "./Review";

function GymReviews({ gymData, refetch }) {
  const userStorage = localStorage.getItem("user");
  const { reviews } = gymData;
  const [rate, setRate] = useState(0);
  const [username, setUsername] = useState("");
  const [reviewdescription, setReviewDescription] = useState("");
  const [countReviews, setCountReviews] = useState(2);
  const [phone, setPhone] = useState();
  const [message, setmessage] = useState({ username: "", phone: "", rate: "" });
  const [errorsMessage, setError] = useState({
    errorMessage: "",
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { errorMessage, vertical, horizontal, open } = errorsMessage;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError({ ...errorsMessage, open: false });
  };
  const isShowAll = () => {
    return countReviews >= reviews.length;
  };
  const { gymId } = useParams();
  const user = JSON.parse(userStorage);
  const onFinish = async () => {
    try {
      let data = {};
      const msg = { ...message };
      if (!rate) {
        msg.rate = "الرجاء تقييم النادي";
      }
      if (user) {
        data = {
          gymId,
          username: user.username,
          rate,
          description: reviewdescription,
          userPhone: user.phone,
        };
      } else {
        if (!username) {
          msg.username = "حقل اسم المستخدم مطلوب";
        }
        if (!phone) {
          msg.phone = "حقل رقم الهاتف مطلوب";
        }
        if (msg.rate || msg.username || msg.phone) {
          setmessage(msg);
          return;
        }
        data = {
          gymId,
          username,
          rate,
          description: reviewdescription,
          userPhone: phone,
        };
      }
      await axios.post("/api/v1/gym/review", data);
      refetch();
      setRate(0);
      setReviewDescription("");
      setUsername("");
      setPhone("");
    } catch (error) {
      const errorMess = error.response.data.message;
      setError({ ...errorsMessage, open: true, errorMessage: errorMess });
    }
  };

  return (
    <div className="review">
      {reviews.length > 0 ? (
        <div>
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
        </div>
      ) : (
        <p className="noreview">لا يوجد تقييمات سابقة </p>
      )}
      <Stack spacing={0.5}>
        <Typography className="user__name" fontWeight={700} noWrap>
          أضف رايك
        </Typography>

        <Rating
          name="simple-controlled"
          value={rate}
          onChange={(event, newValue) => {
            setRate(newValue);
            setmessage({ ...message, rate: "" });
          }}
        />
        {message.rate && (
          <FormHelperText id="component-error-text" error>
            {message.rate}
          </FormHelperText>
        )}

        <Box
          className="opinion"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {!user && (
            <>
              <TextField
                fullWidth
                id="outlined-basic"
                label="أدخل اسمك"
                helperText={message.username}
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
                  setmessage({ ...message, username: "" });
                }}
                variant="outlined"
              />
              <TextField
                fullWidth
                sx={{
                  m: 1,
                  maxWidth: 600,
                }}
                md={{
                  maxWidth: 1000,
                }}
                helperText={message.phone}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                size="medium"
                name="userPhone"
                id="userPhone"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  setmessage({ ...message, phone: "" });
                }}
                label="أدخل رقم الهاتف"
                variant="outlined"
              />
            </>
          )}
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
            onClick={() => onFinish()}
          >
            أضف رايك
          </Button>
        </Box>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
GymReviews.propTypes = {
  gymData: PropTypes.instanceOf(Object).isRequired,
};
GymReviews.propTypes = {
  refetch: PropTypes.func.isRequired,
};
export default GymReviews;
