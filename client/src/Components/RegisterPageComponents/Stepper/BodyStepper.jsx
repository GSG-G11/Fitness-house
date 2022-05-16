import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  LoginInformation,
  StepThreeComponent,
  ContactInformation,
} from "./Steps";

const loginInfoSchema = Yup.object().shape({
  image: Yup.string().required("حقل الشعار مطلوب"),
  name: Yup.string().required("حقل الاسم مطلوب"),
  email: Yup.string()
    .email(" البريد الالكتروني غير صحيح")
    .required("حقل البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور على الاقل 8 احرف")
    .required("حقل كلمة المرور مطلوب"),
});

const SignupSchema = Yup.object().shape({
  city: Yup.string().required("حقل المدينة مطلوب"),
  phone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
  description: Yup.string().max(255, "الوصف يجب أن لا يزيد عن 255 حرف"),
});

export default function BodyStepper() {
  const activeStep = useSelector(({ stepper }) => stepper.activeStep);

  const loginInformationfForm = useFormik({
    initialValues: {
      image: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema: loginInfoSchema,
    onSubmit: (values) => {
      console.log(values);
    },
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
      StepComponent = (
        <LoginInformation loginInformationfForm={loginInformationfForm} />
      );
  }

  return StepComponent;
}
