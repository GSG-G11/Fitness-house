import { Grid, Skeleton } from "@mui/material";
import React from "react";

export default function LoadingForm() {
  return (
    <form className="form__update_profile">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Skeleton animation="wave" width="100%" height="4.8rem" />
        </Grid>

        <Grid item xs={12} md={4} />

        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="15.8rem" />
        </Grid>

        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="15.8rem" />
        </Grid>

        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="15.8rem" />
        </Grid>

        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="15.8rem" />
        </Grid>

        <Grid item xs={12} md={4}>
          <Skeleton animation="wave" width="100%" height="15.8rem" />
        </Grid>
      </Grid>
      <Skeleton animation="wave" width="15rem" height="4rem" />
    </form>
  );
}
