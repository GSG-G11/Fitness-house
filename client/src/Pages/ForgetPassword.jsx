import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import ForgetPasswordCom from "../Components/LoginPage/ForgetPassword";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "",
  });

  const { message, vertical, horizontal, open, severity } = alertMessage;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertMessage({ ...alertMessage, open: false });
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const data = await axios.post("/api/v1/gyms/forget/password", values);
      setLoading(false);
      setAlertMessage({
        ...alertMessage,
        open: true,
        message: data.data.message,
        severity: "success",
      });
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response.data.message;
      setAlertMessage({
        ...alertMessage,
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };
  return (
    <div className="container">
      <div className="sub__container">
        <ForgetPasswordCom onFinish={onFinish} loading={loading} />
        <Typography className="center" component="h4" sx={{ mt: 2 }}>
          ليس لديك حساب ؟&ensp;<Link to="/gym/register"> إنشاء حساب </Link>
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} variant="filled" severity={severity}>
            {message}!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
