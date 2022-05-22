import React from "react";

import HeaderStepper from "./HeaderStepper";
import BodyStepper from "./BodyStepper";

const steps = ["معلومات الدخول", "معلومات التواصل", "تفاصيل النادي"];

export default function StepperLayout() {
  return (
    <>
      <HeaderStepper steps={steps} />
      <BodyStepper />
    </>
  );
}
