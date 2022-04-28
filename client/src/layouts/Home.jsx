import React from "react";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <p>navbar</p>

      <h2>Header</h2>
      <h3>Header welcome Page</h3>

      <Outlet />

      <footer>footer</footer>
    </div>
  );
}
