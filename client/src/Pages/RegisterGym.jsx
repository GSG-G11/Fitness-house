import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { StepperLayout } from "../Components";

function RegisterGym() {
  return (
    <div className="container">
      <div className="sub__container">
        <Typography
          className="center"
          variant="h3"
          component="h4"
          sx={{ mb: 2 }}
        >
          إشترك معنا
        </Typography>

        <StepperLayout />
        <Typography className="center" component="h4" sx={{ mt: 2 }}>
          يوحد لديك حساب ؟&ensp;<Link to="/gym/login"> تسجيل الدخول </Link>
        </Typography>
      </div>
    </div>
  );
}

export default RegisterGym;
