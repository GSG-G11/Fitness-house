import React from "react";
import { useSelector } from "react-redux";
import {
  StepOneComponent,
  StepThreeComponent,
  StepTwoComponent,
} from "./Steps";

export default function BodyStepper() {
  const activeStep = useSelector(({ stepper }) => stepper.activeStep);

  let StepComponent;
  switch (activeStep) {
    case 1:
      StepComponent = StepTwoComponent;
      break;
    case 2:
      StepComponent = StepThreeComponent;
      break;
    default:
      StepComponent = StepOneComponent;
  }

  return <StepComponent />;
}
