/* eslint-disable consistent-return */
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

import { Dashboard, Home } from "./Layouts";

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
  SubscriberGymPage,
  ReviewsGymPage,
} from "./Pages";

import "./app.css";

import { setAuth, setLogout } from "./Store/Slices";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;
        const { id, name, role } = jwtDecode(token);
        dispatch(
          setAuth({
            id,
            name,
            role,
            isLoggedIn: true,
          })
        );
      } catch (error) {
        dispatch(setLogout());
      }
    };
    checkToken();
  }, [dispatch]);

  return (
    <Routes>
      {/* Routes For Site Views {login, gym filter,...} */}
      <Route path="/" element={<Home />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="gym/login" element={<LoginGymPage />} />
        <Route path="gym/register" element={<RegisterGymPage />} />
        <Route path="gyms/filter" element={<SearchGymPage />} />
        <Route path="gyms/profile/:gymId" element={<ProfileGymPage />} />

        {/* .... other Routes ... */}
      </Route>
      {/* Routes For Gym Views {login, gym filter,...} */}

      {/* Routes For dashboard Site Views {update gym data,...} */}
      <Route path="gyms/dashboard" element={<Dashboard />}>
        <Route index element={<GymPage />} />
        <Route path="gym/subscribers" element={<SubscriberGymPage />} />
        <Route path="gym/reviews" element={<ReviewsGymPage />} />

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
