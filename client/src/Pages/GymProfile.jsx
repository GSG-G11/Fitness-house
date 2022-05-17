import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { UpdateProfile } from "../Components";

function GymProfile() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/dashboard/gyms">الصفحة الرئيسية</Link>
        <Typography color="text.primary">بيانات النادي</Typography>
      </Breadcrumbs>

      <UpdateProfile />
    </div>
  );
}

export default GymProfile;
