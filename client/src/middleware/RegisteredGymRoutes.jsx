import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

export default function RegisteredGymRoutes({ children }) {
  const { isLoggedIn } = useSelector(({ checkAuth }) => checkAuth.auth);

  if (isLoggedIn) {
    return <Navigate to="/dashboard/gyms" />;
  }

  return children;
}

RegisteredGymRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
