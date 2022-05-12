import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { gymsApi } from "./Services/gyms";

const store = configureStore({
  reducer: {
    [gymsApi.reducerPath]: gymsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gymsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
