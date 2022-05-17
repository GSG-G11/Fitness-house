import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Login } from "../Components";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(" البريد الالكتروني غير صحيح")
    .required("حقل البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور على الاقل 8 احرف")
    .required("حقل كلمة المرور مطلوب"),
});
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
  const onFinish = async (values) => {
    try {
      await axios.post("/api/v1/gyms/login", values);
      navigate("/dashboard/gyms", { replace: true });
    } catch (error) {
      const errorMessage = error.response.data.message;
      setState({ ...state, open: true, message: errorMessage });
    }
  };

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onFinish(values);
    },
  });

  return (
    <div className="container">
      <div className="sub__container">
        <Login loginForm={loginForm} />
        <Typography className="center" component="h4" sx={{ mt: 2 }}>
          ليس لديك حساب ؟&ensp;<Link to="/gym/register"> إنشاء حساب </Link>
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
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
