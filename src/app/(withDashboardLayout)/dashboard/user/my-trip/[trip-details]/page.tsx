"use client";
import { useGetTripQuery } from "@/redux/api/tourApi";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

type TParams = {
  "trip-details": string;
};

interface TripDetailsProps {
  params: TParams;
}

const TripDetails = ({ params }: TripDetailsProps) => {
  const { data, isLoading, error } = useGetTripQuery(params["trip-details"]);

  if (isLoading) {
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>;
  }
  if (error) return <Alert severity="error">Error loading trip details</Alert>;

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{ padding: 4, marginTop: 3, bgcolor: "#f4f6f8" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          Trip to {data.destination}
        </Typography>

        <Box sx={{ marginBottom: 3 }}>
          <CalendarTodayIcon
            sx={{ verticalAlign: "middle", marginRight: 1, color: "#1976d2" }}
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "inline", fontWeight: "bold", color: "black" }}
          >
            Trip Dates
          </Typography>
          <Typography
            fontWeight={600}
            sx={{
              color: "green",
            }}
            variant="body1"
            gutterBottom
          >
            {data.startDate} to {data.endDate}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <AttachMoneyIcon
            sx={{ verticalAlign: "middle", marginRight: 1, color: "#1976d2" }}
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "inline", fontWeight: "bold" }}
          >
            Budget
          </Typography>
          <Typography
            sx={{
              color: "red",
            }}
            fontWeight={600}
            variant="body1"
            gutterBottom
          >
            $ {data.budget}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <FlightTakeoffIcon
            sx={{ verticalAlign: "middle", marginRight: 1, color: "#1976d2" }}
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "inline", fontWeight: "bold" }}
          >
            Travel Type 
          </Typography>
          <Typography
            fontWeight={600}
            sx={{
              color: "purple",
            }}
            variant="body1"
            gutterBottom
          >
            {data.travelType}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <DescriptionIcon
            sx={{ verticalAlign: "middle", marginRight: 1, color: "#1976d2" }}
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              verticalAlign: "middle",
              display: "inline",
              fontWeight: "bold",
            }}
          >
            Description
          </Typography>
          <Typography
            variant="h6"
            fontWeight={500}
            gutterBottom
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {data.description}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <PhotoCameraIcon
            sx={{ verticalAlign: "middle", marginRight: 1, color: "#1976d2" }}
          />
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "inline",
              marginBottom: 4,
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            Photos
          </Typography>
          <Grid container spacing={2}>
            {data.photos.slice(0, 3).map((photo: string, index: number) => (
              <Grid item xs={12} sm={4} key={index}>
                <Box
                  component="img"
                  src={photo}
                  alt={`Trip Photo ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: 400,
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <SportsSoccerIcon
            sx={{ verticalAlign: "middle", marginRight: 1, color: "#1976d2" }}
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "inline", fontWeight: "bold", color: "#1976d2" }}
          >
            Activities
          </Typography>
          <Grid container spacing={3}>
            {data.activities.map((activity: string, index: number) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    bgcolor: index % 2 === 0 ? "#eae5d4" : "#c0b6a4",
                    borderRadius: 2,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent>
                    <List>
                      {activity.split(", ").map((item, i) => (
                        <ListItem key={i} sx={{ paddingY: 0 }}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              fontWeight: "bold",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <ScheduleIcon
            sx={{ verticalAlign: "middle", marginRight: 1, color: "#1976d2" }}
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "inline", fontWeight: "bold", color: "#1976d2" }}
          >
            Itinerary
          </Typography>
          <Grid container spacing={2}>
            {data.itinerary.map((day: string, index: number) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    height: 200,
                    bgcolor: index % 2 === 0 ? "#FFE0B2" : "#FFD180",
                    borderRadius: 2,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardContent>
                    <List>
                      {day.split(", ").map((item, i) => (
                        <ListItem key={i} sx={{ paddingY: 0 }}>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              fontWeight: index % 2 === 0 ? "bold" : "bold",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <PhotoCameraIcon
            sx={{ verticalAlign: "middle", marginRight: 1, color: "#1976d2" }}
          />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "inline", fontWeight: "bold", color: "#1976d2" }}
          >
            More Photos
          </Typography>
          <Grid container spacing={2}>
            {data.photos.slice(3).map((photo: string, index: number) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  component="img"
                  src={photo}
                  alt={`Trip Photo ${index + 1}`}
                  sx={{
                    width: "100%",
                    height: 500,
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default TripDetails;
