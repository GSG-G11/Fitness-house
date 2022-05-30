import { CircularProgress } from "@mui/material";
import React from "react";

import "./styles.css";

export default function Loading() {
  return (
    <div className="loading__container">
      <CircularProgress />
      <span>جاري التحميل . يرجي الانتظار</span>
    </div>
  );
}
