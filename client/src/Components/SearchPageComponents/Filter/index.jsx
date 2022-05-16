import React, { useState } from "react";
import axios from "axios";
import FilterSide from "../FilterSide";
import CardResultFilter from "../CardResultFilter";
import "./style.css";

export default function Filter() {
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const changeFilterQuery = async (query = "") => {
    const response = await axios(`/api/v1/gyms/filter?${query}`);
    setFilter(response.data.gyms);
    setPage(response.data.pagination.totalItems);
  };

  return (
    <section className="filter__section">
      <FilterSide
        setLoading={setLoading}
        changeFilterQuery={changeFilterQuery}
        page={currentPage}
      />
      <div className="bg__container filter__section__result">
        <CardResultFilter
          loading={loading}
          filter={filter}
          page={page}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
}
