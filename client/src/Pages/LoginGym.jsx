import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../Store/Slices";
import { Login } from "../Components";

export default function LoginGym() {
  const [state, setState] = useState({
    message: "",
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { message, vertical, horizontal, open } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({ ...state, open: false });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      const datafrom = await axios.post("/api/v1/gyms/login", values);
      navigate("/dashboard/gyms", { replace: true });
      const { id, name } = datafrom.data.payload;
      dispatch(
        setAuth({
          id,
          name,
          role: "gym",
          isLoggedIn: true,
        })
      );
    } catch (error) {
      const errorMessage = error.response.data.message;
      setState({ ...state, open: true, message: errorMessage });
    }
  };

  return (
    <div className="container">
      <div className="sub__container">
        <Login onFinish={onFinish} />
        <Typography className="center" component="h4" sx={{ mt: 2 }}>
          ليس لديك حساب ؟&ensp;<Link to="/gym/register"> إنشاء حساب </Link>
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} variant="filled" severity="error">
            {message}!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
