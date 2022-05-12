/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { Dashboard, Home } from "./Layouts";
import "./app.css";

import {
  LoginPage,
  RegisterPage,
  LoginGymPage,
  GymPage,
  RegisterGymPage,
  SearchGymPage,
  ProfileGymPage,
  NotfoundPage,
  HomePage,
} from "./Pages";
import { setAuth, setLogout } from "./Store/Slices/checkAuthSlice";

function App() {
  const [cookies] = useCookies();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = () => {
      const { token } = cookies;
      if (!token) dispatch(setLogout());
      const { role, gymName, gymID } = jwt_decode(token);
      dispatch(setAuth({ role, id: gymID, name: gymName, isLoggedIn: true }));
    };
    checkToken();
  }, [cookies, dispatch]);

  return (
    <Routes>
      {/* Routes For Site Views {login, gym filter,...} */}
      <Route path="/" element={<Home />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="gym/login" element={<LoginGymPage />} />
        <Route path="gym/register" element={<RegisterGymPage />} />
        <Route path="gyms/search" element={<SearchGymPage />} />
        <Route path="gyms/profile/:gymId" element={<ProfileGymPage />} />

        {/* .... other Routes ... */}
      </Route>
      {/* Routes For Gym Views {login, gym filter,...} */}

      {/* Routes For dashboard Site Views {update gym data,...} */}
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<GymPage />} />
        <Route path="gym" element={<GymPage />} />

        {/* .... other Routes */}
        <Route path="*" element={<NotfoundPage />} />
      </Route>

      {/* .... other Routes */}

      {/* Routes For not Found Route */}
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
}

export default App;
