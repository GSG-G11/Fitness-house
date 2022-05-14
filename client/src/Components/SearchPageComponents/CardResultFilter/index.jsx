import { Pagination } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

import "./style.css";

export default function CardResultFilter({ filter }) {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="card_result_filter__container">
      {filter.length !== 0 &&
        filter.map((data) => <Card key={data.id} filter={data} />)}
      <div className="switchdiv">
        <Pagination
          count={filter.length}
          variant="outlined"
          shape="rounded"
          page={page}
          size="large"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
CardResultFilter.propTypes = {
  filter: PropTypes.instanceOf(Object).isRequired,
};
