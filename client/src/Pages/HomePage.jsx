import React from "react";
import { useSelector } from "react-redux";
import GymCards from "../Components/Cards";
import Join from "../Components/Joinus";

import Slider from "../Components/Slider";

import OfferForYou from "../Components/OfferForYou";

export default function HomePage() {
  const auth = useSelector(({ checkAuth }) => checkAuth.auth);
  console.log(auth);

  return (
    <>
      <Slider />
      <GymCards page="HomePage" />
      <OfferForYou />
      <Join />
    </>
  );
}
