import { LinearProgress, Pagination } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

import "./style.css";

export default function CardResultFilter({
  loading,
  filter,
  changeFilterQuery,
  page,
}) {
  const handlePageChange = async (event, value) => {
    changeFilterQuery(`page=${value}`);
  };

  return (
    <div className="card_result_filter__container">
      {loading && filter.length !== 0 && <LinearProgress />}
      {!loading && filter.length !== 0 ? (
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
  changeFilterQuery: PropTypes.instanceOf(Object).isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};
