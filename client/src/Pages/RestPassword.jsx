import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import RestPasswordCom from "../Components/LoginPage/RestPassword";
import { setAuth } from "../Store/Slices";

export default function RestPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "info",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, vertical, horizontal, open, severity } = alertMessage;

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertMessage({ ...alertMessage, open: false });
  };

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const {
        data: { payload, responseMessage },
      } = await axios({
        method: "POST",
        url: "/api/v1/gyms/reset/password",
        data: values,
      });

      setAlertMessage({
        ...alertMessage,
        open: true,
        message: responseMessage,
        severity: "success",
      });

      const { id, name } = payload;

      dispatch(
        setAuth({
          id,
          name,
          role: "gym",
          isLoggedIn: true,
        })
      );
      setIsLoading(false);

      navigate("/dashboard/gyms", { replace: true });
    } catch (error) {
      setIsLoading(false);
      setAlertMessage({
        ...alertMessage,
        open: true,
        message: "عذرا حدث خطأ ما , يرجى المحاولة مرة أخرى",
        severity: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="sub__container">
        <RestPasswordCom onFinish={onFinish} isLoading={isLoading} />
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
