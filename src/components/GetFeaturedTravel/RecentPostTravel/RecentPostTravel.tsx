"use client";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RecentPostCard from "./components/RecentPostCard/RecentPostCard";

interface Trip {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  activities: string[];
  itinerary: string[];
  photos: string[];
  travelType: string;
  status: boolean;
  userId: string;
}

const RecentPostTravel = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await fetch(
        "https://tour-buddy-server.vercel.app/api/trips/all-trips?limit=3"
      );
      const data = await res.json();
      setTrips(data.data);
    } catch (error) {
      console.error("Failed to fetch trips:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <Box style={{ textAlign: "center", padding: "2rem" }}>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          color={"primary.main"}
          component="h1"
          gutterBottom
        >
          Discover Your Next Adventure
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Unveil the latest travel experiences and stories from around the
          world.
        </Typography>
      </Box>

      <Box sx={{ padding: "20px" }}>
        {isLoading ? (
          <Stack spacing={1}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton animation={false} />
            <Skeleton animation={false} />
          </Stack>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {trips?.map((trip) => (
              <Grid item key={trip.id} xs={12} sm={6} md={4}>
                <RecentPostCard trip={trip} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default RecentPostTravel;
