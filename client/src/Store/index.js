import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { gymsApi } from "./Services/gyms";

import checkAuthReducer from "./Slices/checkAuthSlice";
import stepperReducer from "./Slices/StepperSlice";

const store = configureStore({
  reducer: {
    [gymsApi.reducerPath]: gymsApi.reducer,
    checkAuth: checkAuthReducer,
    stepper: stepperReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gymsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
