import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  StepOneComponent,
  StepThreeComponent,
  ContactInformation,
} from "./Steps";

const SignupSchema = Yup.object().shape({
  city: Yup.string().required("حقل المدينة مطلوب"),
  phone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
  description: Yup.string().max(255, "الوصف يجب أن لا يزيد عن 255 حرف"),
});

export default function BodyStepper() {
  const activeStep = useSelector(({ stepper }) => stepper.activeStep);

  const contactForm = useFormik({
    initialValues: {
      city: "غزة",
      phone: "",
      description: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  let StepComponent;
  switch (activeStep) {
    case 1:
      StepComponent = <ContactInformation contactForm={contactForm} />;
      break;
    case 2:
      StepComponent = <StepThreeComponent />;
      break;
    default:
      StepComponent = <StepOneComponent />;
  }

  return StepComponent;
}
