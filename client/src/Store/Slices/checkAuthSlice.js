/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    id: null,
    name: null,
    role: null,
    isLoggedIn: false,
  },
};

export const checkAuthSlice = createSlice({
  name: "checkAuth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    setLogout: (state) => {
      state.auth = {
        id: null,
        name: null,
        role: null,
        isLoggedIn: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setLogout } = checkAuthSlice.actions;

export default checkAuthSlice.reducer;
