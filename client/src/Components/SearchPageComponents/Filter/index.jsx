import React from "react";
import CardResultFilter from "../CardResultFilter";

import "./style.css";

export default function Filter() {
  return (
    <section className="filter__section">
      <div className="bg__container filter__section__input">
        Filter input....
      </div>
      <div className="bg__container filter__section__result">
        <CardResultFilter />
      </div>
    </section>
  );
}
