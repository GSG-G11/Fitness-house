import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Login } from "../Components";

export default function LoginGym() {
  return (
    <div className="container">
      <div className="sub__container">
        <Login />
        <Typography className="center" component="h4" sx={{ mt: 2 }}>
          ليس لديك حساب ؟&ensp;<Link to="/gym/register"> إنشاء حساب </Link>
        </Typography>
      </div>
    </div>
  );
}
