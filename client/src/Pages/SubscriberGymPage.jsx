import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

function SubscriberGymPage() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/dashboard/gyms">الصفحة الرئيسية</Link>
        <Typography color="text.primary">المشتركين</Typography>
      </Breadcrumbs>
      المشتركين
    </div>
  );
}

export default SubscriberGymPage;
