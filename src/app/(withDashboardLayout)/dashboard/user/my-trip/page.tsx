"use client";
import { useGetTripRequestQuery } from "@/redux/api/tripRequest";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { Box, Skeleton, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { TravelRequestCard } from "./components/TravelRequestCard";

export default function TravelRequest() {
  const { data: profileData, isLoading: profileLoading } =
    useGetMyProfileQuery("");
  const {
    data: tripData,
    isLoading: tripLoading,
    error: tripError,
  } = useGetTripRequestQuery(profileData?.id, {
    skip: !profileData?.id,
  });

  if (profileLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Skeleton variant="text" width={210} height={60} />
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="rectangular" width={210} height={118} />
      </Box>
    );
  }

  if (tripError) {
    return (
      <Typography variant="h6" color="error">
        Failed to load trip requests.
      </Typography>
    );
  }

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <TextField size="medium" placeholder="Search Trips" />
      </Stack>
      <Typography
        color={"primary.main"}
        variant="h4"
        sx={{ mb: 2 }}
        fontWeight={600}
      >
        My Trips
      </Typography>
      <Grid container spacing={2} p={4}>
        {tripLoading
          ? Array.from(new Array(3)).map((_, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Grid>
            ))
          : tripData?.map((trip: any, index: number) => (
              <Grid item key={index} xs={12} sm={6}>
                <TravelRequestCard trip={trip} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
