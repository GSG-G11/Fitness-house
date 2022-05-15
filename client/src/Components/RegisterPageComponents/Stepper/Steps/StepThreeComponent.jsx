import React from "react";
import { useDispatch } from "react-redux";

import { handleBack } from "../../../../Store/Slices";

export default function StepThreeComponent() {
  const dispatch = useDispatch();
  return (
    <div>
      StepThreeComponent
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
