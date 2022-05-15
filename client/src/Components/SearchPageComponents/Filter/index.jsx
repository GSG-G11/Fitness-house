import React, { useEffect } from "react";
import axios from "axios";
import FilterSide from "../FilterSide";
import CardResultFilter from "../CardResultFilter";
import "./style.css";

export default function Filter() {
  const [filter, setFilter] = React.useState([]);

  const changeFilterQuery = async (query = "") => {
    const response = await axios(`/api/v1/gyms/filter?${query}`);
    setFilter(response.data.gyms);
  };

  useEffect(() => {
    changeFilterQuery();
  }, []);

  return (
    <section className="filter__section">
      <FilterSide changeFilterQuery={changeFilterQuery} />
      <div className="bg__container filter__section__result">
        <CardResultFilter
          filter={filter}
          changeFilterQuery={changeFilterQuery}
        />
      </div>
    </section>
  );
}
