import { Typography } from "@mui/material";
import React from "react";
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
      </div>
    </div>
  );
}

export default RegisterGym;
