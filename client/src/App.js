/* eslint-disable consistent-return */
import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";

import { Dashboard, Home } from "./Layouts";

import {
  LoginGymPage,
  GymProfilePage,
  RegisterGymPage,
  SearchGymPage,
  SingleGymPage,
  NotfoundPage,
  HomePage,
  SubscriberGymPage,
  ReviewsGymPage,
  ImagesGymPage,
} from "./Pages";

import "./app.css";

import { setAuth, setLogout } from "./Store/Slices";
import { ProtectedRoutes, RegisteredGymRoutes } from "./middleware";

function App() {
  const dispatch = useDispatch();

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

  useMemo(checkToken, [checkToken, dispatch]);

  return (
    <Routes>
      {/* Routes For Site Views {login, gym filter,...} */}
      <Route path="/" element={<Home />}>
        <Route index element={<HomePage />} />
        <Route path="gyms/filter" element={<SearchGymPage />} />
        <Route path="gyms/profile/:gymId" element={<SingleGymPage />} />

        <Route
          path="gym/login"
          element={
            <RegisteredGymRoutes>
              <LoginGymPage />
            </RegisteredGymRoutes>
          }
        />
        <Route
          path="gym/register"
          element={
            <RegisteredGymRoutes>
              <RegisterGymPage />
            </RegisteredGymRoutes>
          }
        />

        {/* .... other Routes ... */}
      </Route>
      {/* Routes For Gym Views {login, gym filter,...} */}

      {/* Routes For dashboard Site Views {update gym data,...} */}
      <Route
        path="dashboard/gyms"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      >
        <Route index element={<GymProfilePage />} />
        <Route path="subscribers" element={<SubscriberGymPage />} />
        <Route path="images" element={<ImagesGymPage />} />
        <Route path="reviews" element={<ReviewsGymPage />} />

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
