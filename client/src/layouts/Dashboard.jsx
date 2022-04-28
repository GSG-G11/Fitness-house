import React from "react";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>navbar</p>
      <p>sidebar</p>

      <Outlet />

      <footer>footer</footer>
    </div>
  );
}

export default Dashboard;
