import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Snackbar, Alert } from "@mui/material";
import RestPasswordCom from "../Components/LoginPage/RestPassword";

export default function RestPassword() {
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { message, vertical, horizontal, open } = alertMessage;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertMessage({ ...alertMessage, open: false });
  };

  return (
    <div className="container">
      <div className="sub__container">
        <RestPasswordCom />
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
