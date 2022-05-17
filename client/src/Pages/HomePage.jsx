import React from "react";
import { TopGymCards, JoinUs, Slider, OfferForYou } from "../Components";

export default function HomePage() {
  return (
    <>
      <Slider />
      <TopGymCards page="HomePage" />
      <OfferForYou />
      <JoinUs />
    </>
  );
}
