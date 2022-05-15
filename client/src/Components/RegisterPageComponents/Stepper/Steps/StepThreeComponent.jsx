import React from "react";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { handleBack } from "../../../../Store/Slices";

export default function StepThreeComponent({ contactForm }) {
  console.log(contactForm.values);
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

StepThreeComponent.propTypes = {
  contactForm: PropTypes.instanceOf(Object).isRequired,
};
