import * as React from "react";
import {
  CardContent,
  Avatar,
  Box,
  Chip,
  Stack,
  Divider,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

import "./style.css";
import { Link } from "react-router-dom";

function GymProfile() {
  return (
    <div className="gymprofilecard">
      <div className="rightside">
        <img
          src="https://user-images.githubusercontent.com/38624002/167269431-5f4e1fb8-66ea-499b-ae66-aa2d54c9d1ac.jpg"
          alt="gym"
        />
      </div>
      <Divider variant="middle" />

      <div className="leftside">
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Avatar
              alt="card"
              src="https://user-images.githubusercontent.com/38624002/165934807-05e62410-e543-450d-bbff-bb07be858585.png"
            />
            <Stack spacing={0.5}>
              <Typography className="gymCard__name" fontWeight={700} noWrap>
                Technogym Gaza تكنو جيم
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rafah
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
            <CircularProgress variant="determinate" value="80" />
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
                80%
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            نادي رياضي يحتوي على ملعب صالة لكمال الاجسام ,بالضافة بها مسبح .
            أوقات الدوام من 8-12 صباحا ومن 12-16 مساء
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Typography gutterBottom variant="body1">
            المزايا
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <Chip variant="outlined" label="مسبح" />
            <Chip variant="outlined" label="ميدان تنافسي" />
            <Chip variant="outlined" label="ملعب رياضي" />
          </Box>
        </Box>
        <Box sx={{ mt: "auto", ml: 2, mb: 2 }}>
          <Link to="/gyms/profile/2">
            <Button variant="contained">احجز موعد</Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default GymProfile;
