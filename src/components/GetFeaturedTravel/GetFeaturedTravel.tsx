"use client";
import TravelCard from "@/components/TravelBookDetailsCard/TravelBookDetailsCard";
import { useGetALLApprovalTripRequestQuery } from "@/redux/api/tripRequest";
import { useDebounced } from "@/redux/hooks";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link"; // Import Link for navigation
import { useState } from "react";

const GetFeaturedTravel = () => {
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

  // Limit the number of trips shown initially to 6
  const limitedData = data?.slice(0, 6);

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
           
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {limitedData?.map((trip: any, index: number) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <TravelCard trip={trip} />
                </Grid>
              ))}
            </Grid>

            {/* Show 'See More' button if there are more than 6 trips */}
            {data && data.length > 6 && (
              <Box sx={{ mt: 5 }}>
                <Link href="/tour-page" passHref>
                  <Button variant="contained" color="primary">
                    See More
                  </Button>
                </Link>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default GetFeaturedTravel;
