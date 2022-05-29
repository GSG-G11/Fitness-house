import React from "react";

import "./styles.css";

export default function Loading() {
  return (
    <div className="loading__container">
      <div className="lds-roller">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
      <span>جاري التحميل . يرجي الانتظار</span>
    </div>
  );
}
