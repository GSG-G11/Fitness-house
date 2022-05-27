import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../Components";

export default function Home() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
