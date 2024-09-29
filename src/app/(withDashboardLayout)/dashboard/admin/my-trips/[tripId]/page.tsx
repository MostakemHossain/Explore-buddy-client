"use client";

import ExploreBuddyDatePicker from "@/components/Forms/ExploreBuddyDatePicker";
import { useGetTripQuery, useUpdateMyTripMutation } from "@/redux/api/tourApi";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    tripId: string;
  };
};

const TourUpdate = ({ params }: TParams) => {
  const { data, isLoading } = useGetTripQuery(params?.tripId);
  const [updateMyTrip] = useUpdateMyTripMutation();
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
    activities: "",
    itinerary: "",
    travelType: "",
    photos: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        destination: data.destination || "",
        description: data.description || "",
        startDate: data.startDate ? data.startDate.split("T")[0] : "",
        endDate: data.endDate ? data.endDate.split("T")[0] : "",
        budget: data.budget || "",
        activities: data.activities?.join(", ") || "",
        itinerary: data.itinerary?.join("\n") || "",
        travelType: data.travelType || "",
        photos: data.photos?.join(", ") || "",
      });
    }
  }, [data]);

  const methods = useForm();
  const handleChange = (e: FieldValues) => {
    if (e.target) {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      const { name, value } = e;
      setFormData({
        ...formData,
        [name]: value ? value.toISOString().split("T")[0] : "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    const { activities, itinerary, photos, startDate, endDate } = formData;
    const formattedData = {
      ...formData,
      startDate: dateFormatter(startDate),
      endDate: dateFormatter(endDate),
      budget: parseFloat(formData.budget),
      activities: activities.split(",").map((activity) => activity.trim()),
      itinerary: itinerary.split("\n").map((day) => day.trim()),
      photos: photos.split(",").map((photo) => photo.trim()),
    };

    try {
      const res = await updateMyTrip({
        id: params.tripId,
        ...formattedData,
      }).unwrap();
      if (res?.id) {
        toast.success("Trip Updated successfully");
        router.push("/dashboard/admin/my-trips"); 
      }
    } catch (error: any) {
      console.log("Error from API:", error.message);
      toast.error("Failed to update trip");
    } finally {
      setLoading(false); 
      methods.reset();
    }
  };

  if (isLoading) {
    return (
      <Typography>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Typography>
    );
  }

  return (
    <FormProvider {...methods}>
      <Container>
        <Typography variant="h3" color={"primary.main"} gutterBottom>
          Update My Trip
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Detailed Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <ExploreBuddyDatePicker
                label="Start Date"
                name="startDate"
                onChange={(value) => handleChange({ name: "startDate", value })}
                value={formData.startDate}
              />
            </Grid>
            <Grid item xs={6}>
              <ExploreBuddyDatePicker
                label="End Date"
                name="endDate"
                onChange={(value) => handleChange({ name: "endDate", value })}
                value={formData.endDate}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Activities (comma-separated)"
                name="activities"
                value={formData.activities}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Itinerary (one per line)"
                name="itinerary"
                multiline
                rows={4}
                value={formData.itinerary}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="travelType-label">Travel Type</InputLabel>
              <Select
                fullWidth
                labelId="travelType-label"
                name="travelType"
                value={formData.travelType}
                onChange={handleChange}
                required
              >
                <MenuItem value="">Select Travel Type</MenuItem>
                <MenuItem value="Adventure">Adventure</MenuItem>
                <MenuItem value="Leisure">Leisure</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Couple">Couple</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Photos (comma-separated)"
                name="photos"
                value={formData.photos}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading} 
                >
                  {loading ? <CircularProgress size={24} /> : "Submit"}{" "}
                  
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
};

export default TourUpdate;
