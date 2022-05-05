import React from "react";
import { Outlet } from "react-router-dom";
import Join from "../Components/Joinus";

export default function Home() {
  return (
    <div>
      <p>navbar</p>

      <h2>Header</h2>
      <h3>Header welcome Page</h3>

      <Outlet />
      <Join />
      <footer>footer</footer>
    </div>
  );
}
