/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
};

export const StepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    handleNext: (state) => {
      state.activeStep += 1;
    },
    handleBack: (state) => {
      state.activeStep -= 1;
    },
    handleReset: (state) => {
      state.activeStep = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleNext, handleBack, handleReset } = StepperSlice.actions;

export default StepperSlice.reducer;
