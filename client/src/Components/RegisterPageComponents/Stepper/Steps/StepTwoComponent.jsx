import React from "react";
import { useDispatch } from "react-redux";

import { handleBack, handleNext } from "../../../../Store/Slices";

export default function StepTwoComponent() {
  const dispatch = useDispatch();
  return (
    <div>
      StepTwoComponent
      <button
        type="button"
        onClick={() => {
          dispatch(handleNext());
        }}
      >
        الخطوة التالية
      </button>
      <button
        type="button"
        onClick={() => {
          dispatch(handleBack());
        }}
      >
        الخطوة السابقة
      </button>
    </div>
  );
}
