import React from "react";

import PropTypes from "prop-types";
import {
  Box,
  CardContent,
  Chip,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Card({ filter }) {
  const { id, name, image, location, description, rating, features } = filter;

  return (
    <div className="card__filter">
      <div className="image__card">
        <img alt="complex" src={image} />
      </div>
      <div className="body__card">
        <Typography sx={{ m: 1, mb: 0 }} variant="h4">
          {name}
        </Typography>
        <Typography sx={{ mx: 1 }} variant="body3">
          {location}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description.slice(0, 100)}...
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <Rating value={rating} readOnly sx={{ m: 1 }} />
        <Box sx={{ m: 1 }}>
          <Typography gutterBottom variant="body1">
            المزايا
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {features.map((feature) => (
              <Chip key={feature} variant="outlined" label={feature} />
            ))}
          </Box>
        </Box>

        <Box
          sx={{ m: 1, mt: "auto", display: "flex", justifyContent: "flex-end" }}
        >
          <Link className="btn__card" to={`/gyms/profile/${id}`}>
            احجز موعد
          </Link>
        </Box>
      </div>
    </div>
  );
}

Card.propTypes = {
  filter: PropTypes.instanceOf(Object).isRequired,
};
