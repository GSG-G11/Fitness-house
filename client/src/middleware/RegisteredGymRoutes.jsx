import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";

export default function RegisteredGymRoutes({ children, isResetPage }) {
  const { isLoggedIn } = useSelector(({ checkAuth }) => checkAuth.auth);
  const [searchParams] = useSearchParams();
  if (isLoggedIn) {
    return <Navigate to="/dashboard/gyms" />;
  }

  // if is not logged in and has not token redirect to login page
  if (isResetPage && !searchParams.get("token")) {
    return <Navigate to="/gym/login" />;
  }

  return children;
}

RegisteredGymRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  isResetPage: PropTypes.bool,
};

RegisteredGymRoutes.defaultProps = {
  isResetPage: false,
};
