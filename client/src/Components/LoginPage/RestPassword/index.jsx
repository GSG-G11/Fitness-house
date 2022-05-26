import React from "react";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "../PasswordInput";
// import PropTypes from "prop-types";
// import EmailInput from "./EmailInput";

const restSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "كلمة المرور على الاقل 8 احرف")
    .required("حقل كلمة المرور مطلوب"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "يجب ان تتطابق كلمة المرور"
  ),
});
export default function RestPasswordCom() {
  const restForm = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: restSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: false,
  });
  return (
    <form className="form__container" onSubmit={restForm.handleSubmit}>
      <Typography className="center" variant="h3" component="h4" sx={{ mb: 2 }}>
        اعد كلمة المرور
      </Typography>
      <PasswordInput form={restForm} label="password" />
      <PasswordInput form={restForm} label="passwordConfirmation" />
      <LoadingButton
        sx={{
          mt: 3,
          width: "350px",
          height: "56px",
        }}
        size="large"
        type="submit"
        variant="contained"
      >
        حفظ كلمة المرور
      </LoadingButton>
    </form>
  );
}
