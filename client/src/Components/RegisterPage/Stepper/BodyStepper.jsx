import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginInfoSchema, SignupSchema } from "../registerSchema";

import { handleNext } from "../../../Store/Slices";
import {
  LoginInformation,
  DetailsComponent,
  ContactInformation,
} from "./Steps";

export default function BodyStepper() {
  const dispatch = useDispatch();

  const activeStep = useSelector(({ stepper }) => stepper.activeStep);

  const loginInformationForm = useFormik({
    initialValues: {
      logo: "",
      gymName: "",
      email: "",
      password: "",
    },
    validationSchema: loginInfoSchema,
    onSubmit: (values) => {
      dispatch(handleNext(values));
    },
    validateOnChange: false,
  });

  const contactForm = useFormik({
    initialValues: {
      city: "غزة",
      phone: "",
      description: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      dispatch(handleNext());
    },
    validateOnChange: false,
  });

  let StepComponent;
  switch (activeStep) {
    case 1:
      StepComponent = <ContactInformation contactForm={contactForm} />;
      break;
    case 2:
      StepComponent = (
        <DetailsComponent
          loginValues={loginInformationForm.values}
          contactValues={contactForm.values}
        />
      );
      break;
    default:
      StepComponent = (
        <LoginInformation loginInformationForm={loginInformationForm} />
      );
  }

  return StepComponent;
}
