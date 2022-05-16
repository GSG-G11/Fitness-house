import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  StepOneComponent,
  DetailsComponent,
  ContactInformation,
} from "./Steps";

import { handleNext } from "../../../Store/Slices";

const SignupSchema = Yup.object().shape({
  city: Yup.string().required("حقل المدينة مطلوب"),
  phone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
});
const detailsSchema = Yup.object().shape({
  features: Yup.array().min(1, "حقل المزايا مطلوب"),
  gender: Yup.string().required("حقل الفئة مطلوب"),
  monthPrice: Yup.number()
    .moreThan(1, "يرجى إدخال قيمة أعلى من 1")
    .required("قيمة اشتراك الشهر مطلوب"),
  sixMonthPrice: Yup.number()
    .moreThan(1, "يرجى إدخال قيمة أعلى من 1")
    .required("قيمة اشتراك الستة أشهر مطلوب"),
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
  const detailsForm = useFormik({
    initialValues: {
      features: [],
      gender: "",
      monthPrice: 0,
      sixMonthPrice: 0,
      checked: false,
    },
    validationSchema: detailsSchema,
    onSubmit: () => {
      console.log(detailsForm.values);
    },
  });
  let StepComponent;
  switch (activeStep) {
    case 1:
      StepComponent = <ContactInformation contactForm={contactForm} />;
      break;
    case 2:
      StepComponent = <DetailsComponent detailsForm={detailsForm} />;
      break;
    default:
      StepComponent = <StepOneComponent />;
  }

  return StepComponent;
}
