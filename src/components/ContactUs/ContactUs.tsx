"use client";
import { useUserContactMutation } from "@/redux/api/contactApi";
import { zodResolver } from "@hookform/resolvers/zod";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the Zod schema for form validation
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
});

const ContactSection = () => {
  const [userContact, { isLoading }] = useUserContactMutation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset, // get reset function from useForm
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    try {
      const res = await userContact(data).unwrap();
      if (res.id) {
        toast.success("Message sent successfully!");
        reset(); // reset the form after successful submission
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        position: "relative",
        overflow: "hidden",
        m: { xs: 0, lg: 20 },
      }}
    >
      {/* Decorative shapes */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100px",
          height: "100px",
          backgroundColor: "#ff5722",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100px",
          height: "100px",
          backgroundColor: "#00796b",
          borderRadius: "50%",
          transform: "translate(50%, -50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100px",
          height: "100px",
          backgroundColor: "#d32f2f",
          borderRadius: "50%",
          transform: "translate(-50%, 50%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100px",
          height: "100px",
          backgroundColor: "#ff9800",
          borderRadius: "50%",
          transform: "translate(50%, 50%)",
        }}
      />

      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} data-aos="fade-right">
          <Image
            src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg"
            alt="Contact Us"
            width={400}
            height={400}
            layout="responsive"
            style={{
              margin: "0 auto",
              display: "block",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Typography
            variant="h4"
            color={"primary.main"}
            sx={{ mb: 2, textAlign: "center" }}
          >
            Contact Us
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} data-aos="fade-up" data-aos-delay="100">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Name"
                      variant="outlined"
                      error={!!errors.name}
                      helperText={
                        errors.name ? String(errors.name.message) : ""
                      }
                      InputProps={{ style: { borderRadius: 20 } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} data-aos="fade-up" data-aos-delay="200">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      variant="outlined"
                      error={!!errors.email}
                      helperText={
                        errors.email ? String(errors.email.message) : ""
                      }
                      InputProps={{ style: { borderRadius: 20 } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} data-aos="fade-up" data-aos-delay="300">
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone No."
                      variant="outlined"
                      error={!!errors.phoneNumber}
                      helperText={
                        errors.phoneNumber
                          ? String(errors.phoneNumber.message)
                          : ""
                      }
                      InputProps={{ style: { borderRadius: 20 } }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} data-aos="fade-up" data-aos-delay="400">
                <Controller
                  name="message"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      error={!!errors.message}
                      helperText={
                        errors.message ? String(errors.message.message) : ""
                      }
                      InputProps={{ style: { borderRadius: 20 } }}
                    />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ textAlign: { xs: "center", sm: "center" } }}
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  sx={{
                    borderRadius: 20,
                    backgroundColor: "#ff5722",
                    color: "white",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: { xs: "100%", sm: "auto", lg: "70%" },
                  }}
                  disabled={isLoading}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;
