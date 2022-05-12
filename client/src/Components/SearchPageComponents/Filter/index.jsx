import React from "react";
import FilterSide from "../../FilterSide";
import CardResultFilter from "../CardResultFilter";

import "./style.css";

export default function Filter() {
  return (
    <section className="filter__section">
      <FilterSide />{" "}
      <div className="bg__container filter__section__result">
        <CardResultFilter />
      </div>
    </section>
  );
}
