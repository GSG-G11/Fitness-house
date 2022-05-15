import React from "react";
import { useDispatch } from "react-redux";

import { handleNext } from "../../../../Store/Slices";

export default function StepOneComponent() {
  const dispatch = useDispatch();
  return (
    <div>
      <p>StepOneComponent</p>
      <button
        type="button"
        onClick={() => {
          dispatch(handleNext());
        }}
      >
        الخطوة التالية
      </button>
    </div>
  );
}
