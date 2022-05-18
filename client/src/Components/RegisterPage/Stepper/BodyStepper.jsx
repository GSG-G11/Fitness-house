import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { handleNext } from "../../../Store/Slices";
import {
  LoginInformation,
  DetailsComponent,
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
      StepComponent = (
        <LoginInformation loginInformationfForm={loginInformationfForm} />
      );
  }

  return StepComponent;
}
