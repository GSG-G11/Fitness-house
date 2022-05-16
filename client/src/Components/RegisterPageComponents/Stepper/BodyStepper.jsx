import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  StepOneComponent,
  StepThreeComponent,
  ContactInformation,
} from "./Steps";
import { handleNext } from "../../../Store/Slices";

const SignupSchema = Yup.object().shape({
  city: Yup.string().required("حقل المدينة مطلوب"),
  phone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
  description: Yup.string().max(255, "الوصف يجب أن لا يزيد عن 255 حرف"),
  features: Yup.array().min(1, "حقل المزايا مطلوب"),
  gender: Yup.string().required("حقل الفئة مطلوب"),
  monthPrice: Yup.number().moreThan(1, "قيمة الاشتراك الشهرية مطلوبة"),
  sixMonthPrice: Yup.number().moreThan(1, "قيمة اشتراك الستة أشهر مطلوب"),
});

export default function BodyStepper() {
  const dispatch = useDispatch();

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
      dispatch(handleNext());
    },
  });
  const thirfForm = useFormik({
    initialValues: {
      features: [],
      gender: "",
      monthPrice: 0,
      sixMonthPrice: 0,
      checked: false,
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
      StepComponent = <StepThreeComponent thirfForm={thirfForm} />;
      break;
    default:
      StepComponent = <StepOneComponent />;
  }

  return StepComponent;
}
