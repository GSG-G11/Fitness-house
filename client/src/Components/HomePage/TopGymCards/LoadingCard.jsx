import { Box, Card, CardContent, CardHeader, Skeleton } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

export default function LoadingCard({ id }) {
  return (
    <Card id={`load-gymCard-${id}`} sx={{ maxWidth: 300, maxHeight: 500 }}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
          <Box sx={{ display: "flex", gap: "2rem" }}>
            <Skeleton
              animation="wave"
              height={50}
              width="35%"
              style={{ borderRadius: "10px" }}
            />
            <Skeleton
              animation="wave"
              height={50}
              width="35%"
              style={{ borderRadius: "10px" }}
            />
            <Skeleton
              animation="wave"
              height={50}
              width="35%"
              style={{ borderRadius: "10px" }}
            />
            <Skeleton
              animation="wave"
              height={50}
              width="35%"
              style={{ borderRadius: "10px" }}
            />
          </Box>

          <Skeleton
            animation="wave"
            height={55}
            width="40%"
            style={{ borderRadius: "10px" }}
          />
        </>
      </CardContent>
    </Card>
  );
}

LoadingCard.propTypes = {
  id: PropTypes.number.isRequired,
};
