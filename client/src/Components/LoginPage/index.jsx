import React, { useState } from "react";
import { TextField, InputAdornment, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff, Email } from "@mui/icons-material";
import PropTypes from "prop-types";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(" البريد الالكتروني غير صحيح")
    .required("حقل البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور على الاقل 8 احرف")
    .required("حقل كلمة المرور مطلوب"),
});

export default function Login({ onFinish }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
    <form className="form__container" onSubmit={loginForm.handleSubmit}>
      <Typography className="center" variant="h3" component="h4" sx={{ mb: 2 }}>
        تسجيل الدخول
      </Typography>
      <TextField
        sx={{ mt: 3, width: "500px" }}
        label="أدخل البريد الإلكتروني"
        name="email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Email />
            </InputAdornment>
          ),
        }}
        value={loginForm.values.email}
        onChange={loginForm.handleChange}
        error={!!loginForm.errors.email}
        autoComplete="email"
        helperText={loginForm.errors.email}
        variant="outlined"
      />
      <TextField
        sx={{ mt: 3, width: "500px" }}
        label="أدخل كلمة السر"
        type={showPassword ? "text" : "password"}
        name="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleClickShowPassword}>
              {showPassword ? (
                <VisibilityOff sx={{ cursor: "pointer" }} />
              ) : (
                <Visibility sx={{ cursor: "pointer" }} />
              )}
            </InputAdornment>
          ),
        }}
        value={loginForm.values.password}
        onChange={loginForm.handleChange}
        error={!!loginForm.errors.password}
        helperText={loginForm.errors.password}
        autoComplete="current-password"
        variant="outlined"
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 3, height: "3.3rem", width: "500px" }}
      >
        تسجيل الدخول
      </Button>
    </form>
  );
}
Login.propTypes = {
  onFinish: PropTypes.func.isRequired,
};
