import React from "react";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import EmailInput from "../EmailInput";

const forgetSchema = Yup.object().shape({
  email: Yup.string()
    .email(" البريد الالكتروني غير صحيح")
    .required("حقل البريد الالكتروني مطلوب"),
});
export default function ForgetPasswordCom({ onFinish, loading }) {
  const forgetForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetSchema,
    onSubmit: (values) => {
      onFinish(values);
    },
    validateOnChange: false,
  });
  return (
    <form className="form__container" onSubmit={forgetForm.handleSubmit}>
      <Typography className="center" variant="h3" component="h4" sx={{ mb: 2 }}>
        تذكر كلمة المرور
      </Typography>
      <EmailInput form={forgetForm} />
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
        تذكر كلمة المرور
      </LoadingButton>
    </form>
  );
}

ForgetPasswordCom.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

ForgetPasswordCom.propTypes = {
  loading: PropTypes.bool.isRequired,
};
