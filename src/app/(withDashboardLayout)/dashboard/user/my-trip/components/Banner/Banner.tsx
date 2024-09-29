import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";

const Banner = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "20px 10px", md: "50px 20px", lg: "50px" },
          background: "linear-gradient(to right, #f2f4fc63 0%, #895645 100%)",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h4"
                component="h1"
                fontWeight={600}
                gutterBottom
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
                data-aos="fade-right"
              >
                Explore the World with Us...
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                color="secondary"
                gutterBottom
                fontWeight={600}
                sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" } }}
                data-aos="fade-left"
                data-aos-delay="200"
              >
                Discover Your Next Adventure and{" "}
                <span style={{ color: "#ff5722" }}>
                  Experience Unforgettable Journeys
                </span>
                !
              </Typography>
              <Typography
                variant="body1"
                fontWeight={600}
                component="p"
                gutterBottom
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" } }}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Join our travel community and find the perfect destination that
                matches your wanderlust. Enjoy a seamless travel experience with
                curated trips designed for you. Start your journey to an
                unforgettable adventure today...!
              </Typography>
              <Box
                mt={4}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  gap: { xs: 2, sm: 0 },
                }}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: { sm: "0 10px 0 0" } }}
                >
                  Book Your Trip
                </Button>
                <Link href="/tour-page">
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      margin: { sm: "0 0 0 10px" },
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                  >
                    Explore more
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "100%", md: "500px" },
                margin: { xs: "20px auto", md: "0 auto" },
                height: { xs: "auto", md: "100%" },
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Main Building"
                data-aos="fade-up"
                sx={{
                  width: "100%",
                  borderRadius: "15px",
                  position: { xs: "relative", md: "absolute" },
                  top: { xs: "auto", md: "-400px" },
                  right: { xs: "auto", md: "100px" },
                  marginBottom: { xs: 2, md: 0 },
                }}
              />
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1541410965313-d53b3c16ef17?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Travel"
                data-aos="fade-left"
                sx={{
                  position: "absolute",
                  width: { xs: "80px", sm: "120px", md: "320px" },
                  height: "auto",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                  top: { xs: "auto", md: "-140px" },
                  right: { xs: "auto", md: "-70px" },
                  marginTop: { xs: 1, md: 0 },
                  display: { xs: "none", md: "block" },
                }}
              />
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzl8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D"
                alt="Travel"
                data-aos="fade-right"
                sx={{
                  position: "absolute",
                  width: { xs: "80px", sm: "120px", md: "320px" },
                  height: { xs: "auto", md: "300px" },
                  borderRadius: "20px",
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                  top: { xs: "auto", md: "-40px" },
                  right: { xs: "auto", md: "270px" },
                  marginTop: { xs: 1, md: 0 },
                  display: { xs: "none", md: "block" },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Banner;
