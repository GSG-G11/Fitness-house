import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  StepOneComponent,
  StepThreeComponent,
  ContactInformation,
} from "./Steps";

export default function BodyStepper() {
  const activeStep = useSelector(({ stepper }) => stepper.activeStep);

  const SignupSchema = Yup.object().shape({
    city: Yup.string().required("حقل المدينة مطلوب"),
    phone: Yup.string()
      .min(9, "الرقم يجب أن يكون 9 أرقام على الأقل")
      .max(10, "الرقم يجب أن  لا يكون 10 أرقام")
      .required("حقل رقم الهاتف مطلوب"),
    description: Yup.string().max(255, "الوصف يجب أن لا يزيد عن 255 حرف"),
  });

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
