import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Link from "next/link";

type TProps = {
  trip: any;
};

export function TravelRequestCard({ trip }: TProps) {
  const statusStyle = {
    color: trip.status === "PENDING" ? "red" : "green",
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <Image
        src={trip.trip.photos[2]}
        alt="card"
        width={500}
        height={100}
        style={{ width: "100%", height: "300px" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          fontWeight={600}
          color={"primary.main"}
          component="div"
        >
          {trip.trip.destination}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" color="purple" fontWeight={600}>
            {trip.trip.budget} $
          </Typography>
          <Typography
            variant="h6"
            color="violet"
            fontStyle={"italic"}
            fontWeight={600}
          >
            {trip.trip.travelType}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={600} style={statusStyle}>
          {trip.status}
        </Typography>
        <Link href={`/dashboard/user/my-travel-request/${trip.trip.id}`}>
          <Button size="small">View Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
