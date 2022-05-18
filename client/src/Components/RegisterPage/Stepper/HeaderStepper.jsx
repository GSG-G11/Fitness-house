import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Step, StepLabel, Stepper } from "@mui/material";

function HeaderStepper({ steps }) {
  const activeStep = useSelector(({ stepper }) => stepper.activeStep);

  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

HeaderStepper.propTypes = {
  steps: PropTypes.instanceOf(Object).isRequired,
};

export default HeaderStepper;
