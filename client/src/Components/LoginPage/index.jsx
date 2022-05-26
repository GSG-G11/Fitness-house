import React from "react";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(" البريد الالكتروني غير صحيح")
    .required("حقل البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور على الاقل 8 احرف")
    .required("حقل كلمة المرور مطلوب"),
});

export default function Login({ onFinish, loading }) {
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      onFinish(values);
    },
    validateOnChange: false,
  });
  return (
    <form className="form__container" onSubmit={loginForm.handleSubmit}>
      <Typography className="center" variant="h3" component="h4" sx={{ mb: 2 }}>
        تسجيل الدخول
      </Typography>
      <EmailInput loginForm={loginForm} />
      <PasswordInput loginForm={loginForm} />
      <LoadingButton
        loading={loading}
        sx={{
          mt: 3,
          width: "350px",
          height: "56px",
        }}
        size="large"
        type="submit"
        variant="contained"
      >
        تسجيل الدخول
      </LoadingButton>
    </form>
  );
}
Login.propTypes = {
  onFinish: PropTypes.func.isRequired,
};
Login.propTypes = {
  loading: PropTypes.bool.isRequired,
};
