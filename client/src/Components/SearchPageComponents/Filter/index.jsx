import React, { useState } from "react";
import axios from "axios";
import FilterSide from "../FilterSide";
import CardResultFilter from "../CardResultFilter";
import "./style.css";

export default function Filter() {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const changeFilterQuery = async (query = "") => {
    setLoading(true);
    const response = await axios(`/api/v1/gyms/filter?${query}`);
    setFilter(response.data.gyms);
    setPage(response.data.pagination.totalItems);
    setLoading(false);
  };

  return (
    <section className="filter__section">
      <FilterSide changeFilterQuery={changeFilterQuery} />
      <div className="bg__container filter__section__result">
        <CardResultFilter
          loading={loading}
          filter={filter}
          page={page}
          changeFilterQuery={changeFilterQuery}
        />
      </div>
    </section>
  );
}
