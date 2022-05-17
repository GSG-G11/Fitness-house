import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { UpdateProfile } from "../Components";

function GymProfile() {
  return (
    <>
      <Breadcrumbs
        style={{ minWidth: "100%", width: "100%" }}
        // sx={{ minWidth: "100%", width: "100%" }}
        aria-label="breadcrumb"
      >
        <Link to="/dashboard/gyms">الصفحة الرئيسية</Link>
        <Typography color="text.primary">بيانات النادي</Typography>
      </Breadcrumbs>

      <UpdateProfile />
    </>
  );
}

export default GymProfile;
