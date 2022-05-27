import React from "react";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";

import SendIcon from "@mui/icons-material/Send";

import { PropTypes } from "prop-types";
import PasswordInput from "../PasswordInput";

const restSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "كلمة المرور على الاقل 8 احرف")
    .required("حقل كلمة المرور مطلوب"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "يجب ان تتطابق كلمة المرور"
  ),
});
export default function RestPasswordCom({ onFinish, isLoading }) {
  const [searchParams] = useSearchParams();

  const restForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: restSchema,
    onSubmit: async (value) => {
      onFinish({ ...value, token: searchParams.get("token") });
    },
    validateOnChange: false,
  });
  return (
    <form className="form__container" onSubmit={restForm.handleSubmit}>
      <Typography className="center" variant="h3" component="h4" sx={{ mb: 2 }}>
        أعد كلمة المرور
      </Typography>
      <PasswordInput form={restForm} label="password" />
      <PasswordInput form={restForm} label="confirmPassword" />

      <LoadingButton
        style={isLoading ? { color: "#00000080" } : { color: "#fff" }}
        sx={{
          mt: 3,
          width: "350px",
          height: "56px",
          fontSize: "1rem",
          "& .MuiLoadingButton-loadingIndicator": {
            color: "#00000080",
          },
        }}
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        endIcon={<SendIcon className="rotate__180" />}
        loadingPosition="end"
      >
        {!isLoading ? "تعديل كلمة المرور" : "جاري تعديل كلمة المرور"}
      </LoadingButton>
    </form>
  );
}

RestPasswordCom.propTypes = {
  onFinish: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
