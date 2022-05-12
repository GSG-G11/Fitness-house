import React from "react";
import FilterSide from "../Components/FilterSide";
import { Filter } from "../Components";

export default function SearchGym() {
  return (
    <div className="container">
      <FilterSide />
      <div className="sub__container">
        <Filter />
      </div>
    </div>
  );
}
