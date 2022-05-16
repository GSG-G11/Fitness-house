/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-key */
import { Pagination } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

import "./style.css";
import LoadingCard from "./LoadingCard";

export default function CardResultFilter({
  loading,
  filter,
  page,
  setCurrentPage,
}) {
  const handlePageChange = async (event, value) => {
    setCurrentPage(value);
  };
  if (loading) {
    const loadingCards = new Array(3).fill(null);
    return loadingCards.map((_, index) => (
      <div className="switchdiv">
        <LoadingCard key={index} />
      </div>
    ));
  }
  return (
    <div className="card_result_filter__container">
      {filter.length !== 0 ? (
        <>
          {filter.map((data) => (
            <Card key={data.id} filter={data} />
          ))}
          <div className="switchdiv">
            <Pagination
              count={Math.ceil(page / 3)}
              variant="outlined"
              shape="rounded"
              size="large"
              onChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <div className="noresult">
          عذراً لم نتمكن من إيجاد أي نادي يطابق البحث الخاص بك
        </div>
      )}
    </div>
  );
}
CardResultFilter.propTypes = {
  filter: PropTypes.instanceOf(Object).isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
