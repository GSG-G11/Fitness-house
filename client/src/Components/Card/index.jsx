import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

function GymCard({ gym }) {
  const { features, logo, gymName, description, city, image, progress } = gym;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ p: 2, display: "flex" }}>
        <Avatar alt="card" src={logo} />
        <Stack spacing={0.5}>
          <Typography fontWeight={700}>{gymName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {city}
          </Typography>
        </Stack>
        <Box
          sx={{
            marginLeft: "8rem",
            position: "relative",
            display: "inline-flex",
          }}
        >
          <CircularProgress variant="determinate" value={progress} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {progress}%
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <Box sx={{ m: 2 }}>
        <Typography gutterBottom variant="body1">
          المزايا
        </Typography>
        <Stack direction="row" spacing={1}>
          {features.map((feature) => (
            <Chip key={feature} variant="outlined" label={feature} />
          ))}
        </Stack>
      </Box>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <Button variant="contained">احجز موعد</Button>
      </Box>
    </Card>
  );
}
GymCard.propTypes = {
  gym: PropTypes.instanceOf(Object).isRequired,
};
export default GymCard;
