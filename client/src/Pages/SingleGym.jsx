import React from "react";
import { Box, Skeleton, Stack, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { GymImages, GymReviews, TopGymCards, GymProfile } from "../Components";

import { useGetGymDataQuery } from "../Store/Services/gyms";

export default function SingleGym() {
  const { gymId } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetGymDataQuery(gymId);
  const renderProfile = () => {
    if (isLoading) {
      return (
        <Box className="gymprofilecard">
          <Box className="rightside">
            <Skeleton
              sx={{ height: 400, width: 320, borderRadius: "10px" }}
              animation="wave"
              variant="rectangular"
            />
          </Box>
          <Box className="leftside">
            <Box className="topsec">
              <Box
                sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                  <Box width={200}>
                    <Skeleton
                      animation="wave"
                      height={10}
                      style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={10} width="80%" />
                  </Box>
                </Box>
              </Box>
            </Box>

            <CardContent>
              <Skeleton />
              <Skeleton />
              <Skeleton width="60%" />
            </CardContent>
            <Box sx={{ m: 2 }}>
              <Stack direction="row" spacing={1}>
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
              </Stack>
            </Box>
            <Box sx={{ mt: "auto", ml: 2, mb: 2 }}>
              <Skeleton
                animation="wave"
                height={55}
                width="40%"
                style={{ borderRadius: "10px" }}
              />
            </Box>
          </Box>
        </Box>
      );
    }
    if (isError) {
      // Route gym not found
      return <div>عذرا هناك خطأ , أعد تحديث الصفحة </div>;
    }

    const { gymData } = data;
    if (isSuccess && gymData.length === 0)
      return <div>النادي غير موجود , أعد تحديث الصفحة </div>;
    return (
      <>
        <div className="container">
          <GymProfile gymData={gymData} />
        </div>
        <div className="container imgfooter">
          <GymImages gymData={gymData} />
        </div>
        <div className="container">
          <GymReviews gymData={gymData} />
        </div>
        <TopGymCards page="ProfileGym" />
      </>
    );
  };

  return <>{renderProfile()}</>;
}
