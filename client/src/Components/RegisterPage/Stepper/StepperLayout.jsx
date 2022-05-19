import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import HeaderStepper from "./HeaderStepper";
import BodyStepper from "./BodyStepper";
import { setAuth } from "../../../Store/Slices";

const steps = ["معلومات الدخول", "معلومات التواصل", "تفاصيل النادي"];

export default function StepperLayout() {
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
  const onFinish = async (gym) => {
    try {
      const { data } = await axios.post("/api/v1/gyms/register", gym);
      navigate("/dashboard/gyms", { replace: true });
      const { id, gymName } = data.payload;
      dispatch(
        setAuth({
          id,
          gymName,
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
    <>
      <HeaderStepper steps={steps} />
      <BodyStepper onFinish={onFinish} />
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
    </>
  );
}
