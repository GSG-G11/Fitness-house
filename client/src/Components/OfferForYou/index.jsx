import React from "react";
import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

import "./style.css";

export default function OfferForYou() {
  return (
    <Box className="container">
      <Box className="sub__container">
        <Grid container>
          <Grid className="order_offer_1" item xs={12} lg={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardMedia
                    style={{ height: "225px" }}
                    image="https://bit.ly/3skUbkM"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardMedia
                    style={{ height: "225px" }}
                    image="https://bit.ly/3siJZsQ"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardMedia
                    style={{ height: "165px" }}
                    image="https://bit.ly/3KVru4l"
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardMedia
                    style={{ height: "165px" }}
                    image="https://bit.ly/3vUpdCn"
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            lg={8}
            className="order_offer_2"
            style={{ height: "100%", minHeight: "225px" }}
          >
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              pt={2}
              px={2}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#276678",
                }}
                variant="h4"
                component="h2"
                gutterBottom
                noWrap
              >
                ماذا نقدم لك في تمرين
              </Typography>
              <Box mt="auto" mb={2}>
                <Typography
                  variant="body1"
                  component="p"
                  color="textSecondary"
                  sx={{
                    fontSize: "16px",
                    color: "#666666",
                  }}
                >
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا
                  النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف
                  التى يولدها التطبيق.
                </Typography>
              </Box>
              <Box textAlign="left">
                <Link to="/gyms">
                  <Button color="primary" endIcon={<ArrowBackIcon />}>
                    تعرف على أجمل نوادي
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
