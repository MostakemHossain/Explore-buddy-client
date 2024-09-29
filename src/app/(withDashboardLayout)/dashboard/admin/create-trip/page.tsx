"use client";
import ExploreBuddyDatePicker from "@/components/Forms/ExploreBuddyDatePicker";
import { useCreateTourMutation } from "@/redux/api/tourApi";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const TripForm = () => {
  const methods = useForm();

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
  const [createTour] = useCreateTourMutation();

  const handleSubmit = async (e: FieldValues) => {
    e.preventDefault();
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
      const res = await createTour(formattedData).unwrap();
      if (res?.id) {
        toast.success("Tour Created Successfully");
        setFormData({
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
      }
    } catch (error: any) {
      console.log(error.message);
    }

    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Container>
        <Typography variant="h3" color={"primary.main"} gutterBottom>
          Create Trip
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
                onChange={(value) =>
                  handleChange({ target: { name: "startDate", value } })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <ExploreBuddyDatePicker
                label="End Date"
                name="endDate"
                onChange={(value) =>
                  handleChange({ target: { name: "endDate", value } })
                }
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
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </FormProvider>
  );
};

export default TripForm;
