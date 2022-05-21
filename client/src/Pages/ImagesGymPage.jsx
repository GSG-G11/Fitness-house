import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { UploadImages } from "../Components";

function ImagesGymPage() {
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/dashboard/gyms">الصفحة الرئيسية</Link>
        <Typography color="text.primary">صور النادي</Typography>
      </Breadcrumbs>
      <UploadImages />
    </div>
  );
}

export default ImagesGymPage;
