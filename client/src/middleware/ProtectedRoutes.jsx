import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const { role, isLoggedIn } = useSelector(({ checkAuth }) => checkAuth.auth);

  if (!isLoggedIn || role !== "gym") {
    return <Navigate to="/gym/login" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
