import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function LoadingForm() {
  return (
    <form className="form__update_profile">
      <Grid container spacing={2}>
        {/* Input Name Gym */}
        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="4.8rem" />
        </Grid>

        {/* Input phone Gym */}
        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="4.8rem" />
        </Grid>

        {/* Input fulltime */}
        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="4.8rem" />
        </Grid>

        {/* Input gender Gym */}
        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="4.8rem" />
        </Grid>

        {/* Input city Gym */}
        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="4.8rem" />
        </Grid>

        {/* Input Price Gym */}
        <Grid item container xs={12} md={4}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <Skeleton animation="wave" width="100%" height="4.8rem" />
            <Skeleton animation="wave" width="100%" height="4.8rem" />
          </Box>
        </Grid>

        {/* Input Description Gym */}
        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="15.8rem" />
        </Grid>

        {/* Input logo Gym */}
        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="15.8rem" />
        </Grid>

        {/* Input Feature Gym */}
        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="15.8rem" />
        </Grid>
      </Grid>

      <Skeleton animation="wave" width="15rem" height="4rem" />
    </form>
  );
}
