import React from "react";
import { Avatar, Box, Stack, Typography, Rating } from "@mui/material";
import PropTypes from "prop-types";

export default function userReview({ review }) {
  const { rate, description, createdAt, username } = review;

  return (
    <Box sx={{ display: "flex", gap: "1rem", paddingTop: "1.5rem" }}>
      <Avatar alt={username} src="" />
      <Stack spacing={0.5}>
        <Typography className="user__name" fontWeight={700} noWrap>
          {username}
        </Typography>
        <Rating name="read-only" value={rate} readOnly />
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body2" color="text.secondary">
          {createdAt.split("T")[0]}
        </Typography>
      </Stack>
    </Box>
  );
}
userReview.propTypes = {
  review: PropTypes.instanceOf(Object).isRequired,
};
