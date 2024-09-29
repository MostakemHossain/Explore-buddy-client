import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  trip: any;
};

const RecentPostCard = ({ trip }: TProps) => {
  const truncatedDescription = trip.description.slice(0, 65) + ".....";

  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: "100%", sm: "345px", md: "300px", lg: "345px" },
        margin: { sm: "20px" },
        borderRadius: "10px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 4,
          border: "dotted",
        },
      }}
    >
      <Image
        src={trip.photos[2]}
        alt="card"
        width={500}
        height={100}
        style={{ width: "100%", height: "300px" }}
      />
      <CardContent sx={{ position: "relative" }}>
        <Chip
          label="Hot"
          color="warning"
          sx={{ position: "absolute", top: -280, left: 10 }}
        />
        <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
          {trip.destination}
          <LocationOnIcon
            fontSize="small"
            sx={{
              color: "primary.main",
            }}
          />
        </Typography>
        <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
          <Grid item>
            <MyLocationIcon
              sx={{
                color: "primary.main",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1">{truncatedDescription}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">
            <span style={{ color: "#00796b" }}>Start Date:</span>{" "}
            {trip.startDate}
          </Typography>
          <Typography variant="body2">
            <span style={{ color: "#d32f2f" }}>End Date:</span> {trip.endDate}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: "purple" }}>
          Travel Type: {trip.travelType}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Link href={`/${trip.id}`} passHref>
            <Button variant="contained" color="primary">
              Details
            </Button>
          </Link>
          <Typography variant="h6" fontWeight={600}>
            ${trip.budget}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecentPostCard;
