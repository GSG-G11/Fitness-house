import { Pagination } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

import "./style.css";

export default function CardResultFilter({ filter, changeFilterQuery }) {
  const handlePageChange = async (event, value) => {
    changeFilterQuery(`page=${value}`);
  };

  return (
    <div className="card_result_filter__container">
      {filter.length !== 0 &&
        filter.map((data) => <Card key={data.id} filter={data} />)}
      <div className="switchdiv">
        <Pagination
          count={filter.length - 1}
          variant="outlined"
          shape="rounded"
          size="large"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
CardResultFilter.propTypes = {
  filter: PropTypes.instanceOf(Object).isRequired,
  changeFilterQuery: PropTypes.instanceOf(Object).isRequired,
};
