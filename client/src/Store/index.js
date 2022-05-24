import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { gymsApi, subscriptionsApi } from "./Services";

import checkAuthReducer from "./Slices/checkAuthSlice";
import stepperReducer from "./Slices/StepperSlice";

const store = configureStore({
  reducer: {
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
    [gymsApi.reducerPath]: gymsApi.reducer,
    checkAuth: checkAuthReducer,
    stepper: stepperReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      gymsApi.middleware,
      subscriptionsApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export default store;
