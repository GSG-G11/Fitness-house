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
import { keyframes } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

const scaleUpCenter = keyframes`
0%{transform:scale(.5)}
100%{transform:scale(1)}
`;

function GymCard({ gym }) {
  const { id, features, logo, gymName, description, city, images, review } =
    gym;

  const { pathUrl } = images[0];
  const percent = (Math.floor(+review) / 5) * 100;

  return (
    <div className="gymCard" id={`gymCard-${id}`}>
      <Card
        sx={{
          boxShadow: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",

          animation: `${scaleUpCenter} .4s cubic-bezier(.39,.575,.565,1.000) forwards`,
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Avatar alt="card" src={logo} />
            <Stack spacing={0.5}>
              <Typography className="gymCard__name" fontWeight={700} noWrap>
                {gymName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {city}
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              marginLeft: 0,
              position: "relative",
              display: "inline-flex",
            }}
          >
            <CircularProgress variant="determinate" value={percent} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                height: 40,
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
                {percent}%
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardMedia
          component="img"
          height="194"
          image={pathUrl}
          alt="Paella dish"
        />

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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {features.map((feature) => (
              <Chip key={feature} variant="outlined" label={feature} />
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: "auto", ml: 2, mb: 2 }}>
          <Link to={`/gyms/profile/:${id}`}>
            <Button variant="contained">احجز موعد</Button>
          </Link>
        </Box>
      </Card>
    </div>
  );
}
GymCard.propTypes = {
  gym: PropTypes.instanceOf(Object).isRequired,
};
export default GymCard;
