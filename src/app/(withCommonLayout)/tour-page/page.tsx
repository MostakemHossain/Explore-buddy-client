"use client";
import TravelCard from "@/components/TravelBookDetailsCard/TravelBookDetailsCard";
import { useGetALLApprovalTripRequestQuery } from "@/redux/api/tripRequest";
import { useDebounced } from "@/redux/hooks";
import { Box, Grid, Skeleton, TextField, Typography } from "@mui/material";
import { useState } from "react";

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const loadingCircle = {
  width: "20px",
  height: "20px",
  backgroundColor: "#3498db",
  borderRadius: "50%",
  margin: "0 5px",
};

const loadingCircleVariants = {
  start: {
    scale: 0.8,
    opacity: 0.5,
  },
  end: {
    scale: 1.2,
    opacity: 1,
    transition: {
      duration: 0.4,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};

const TourPage = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setsearchTerm] = useState("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading } = useGetALLApprovalTripRequestQuery({ ...query });

  return (
    <Box style={{ textAlign: "center", padding: "2rem" }}>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          color={"primary.main"}
          component="h1"
          gutterBottom
        >
          Explore the World Your Way
        </Typography>
        <Typography
          variant="h6"
          color="textSecondary"
          component="p"
          gutterBottom
        >
          Embrace the journey, conquer the unknown...
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Search destinations, tours, adventures..."
            onChange={(e) => setsearchTerm(e.target.value)}
            InputProps={{
              style: { borderRadius: "50px" },
            }}
            sx={{
              width: {
                xs: "100%",
                md: "700px",
              },
              maxWidth: "100%",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ padding: "20px" }}>
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : (
          <>
            <Typography
              sx={{
                textAlign: "center",
                m: 3,
              }}
              variant="h4"
              fontWeight={600}
              gutterBottom
            >
              Every Adventure Begins with a Single Step
            </Typography>
            <Typography
              fontWeight={600}
              sx={{
                textAlign: "center",
                marginBottom: 2,
              }}
            >
              Discover your next unforgettable journey.
            </Typography>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {data?.map((trip: any, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <TravelCard trip={trip} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TourPage;
