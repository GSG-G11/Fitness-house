import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";

export default function ReviewsGymPage() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/gyms/dashboard">الصفحة الرئيسية</Link>
        <Typography color="text.primary">التقيمات</Typography>
      </Breadcrumbs>
      التقيمات
    </div>
  );
}
