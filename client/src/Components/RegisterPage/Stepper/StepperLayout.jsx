import React from "react";
import BodyStepper from "./BodyStepper";
import HeaderStepper from "./HeaderStepper";

const steps = ["معلومات الدخول", "معلومات التواصل", "تفاصيل النادي"];

export default function StepperLayout() {
  return (
    <>
      <HeaderStepper steps={steps} />
      <BodyStepper />
    </>
  );
}
