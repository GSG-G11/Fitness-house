import React from "react";
import { Avatar, Box, Stack, Typography, Rating } from "@mui/material";
import PropTypes from "prop-types";

export default function userReview({ review }) {
  const { rate, description, createdAt, username, avatar } = review;
  return (
    <div>
      <Box sx={{ display: "flex", gap: "1rem", paddingTop: "1.5rem" }}>
        <Avatar alt="card" src={avatar} />
        <Stack spacing={0.5}>
          <Typography className="user__name" fontWeight={700} noWrap>
            {username}
          </Typography>
          <Rating name="read-only" value={rate} readOnly />
          <Typography variant="body2">{description}</Typography>
          <Typography variant="body2" color="text.secondary">
            {createdAt}
          </Typography>
        </Stack>
      </Box>
    </div>
  );
}
userReview.propTypes = {
  userReview: PropTypes.instanceOf(Object).isRequired,
};
