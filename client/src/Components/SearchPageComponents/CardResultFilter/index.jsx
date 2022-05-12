import { Pagination } from "@mui/material";
import React from "react";
import Card from "./Card";

import "./style.css";

export default function CardResultFilter() {
  const filter = [
    {
      id: 1,
      name: "النادي الاول",
      image: "https://bit.ly/39s08Wv",
      location: "الرياض",
      rating: 4,
      description: "النادي الاول",
      features: ["النادي الاول", "النادي الثاني", "النادي الثالث"],
    },
  ];

  return (
    <div className="card_result_filter__container">
      {filter.length !== 0 &&
        filter.map((data) => <Card key={data.id} filter={data} />)}
      <div className="switchdiv">
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          size="large"
          color="primary"
        />
      </div>
    </div>
  );
}
