"use client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarRateIcon from "@mui/icons-material/StarRate";
import {
  Avatar,
  AvatarGroup,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Image from "next/image";

import img from "@/assets/images/about.avif";

const KnowAboutUs = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Container sx={{ mt: 10 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Left Grid Item */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              color="primary.main"
              fontWeight={600}
              component="h1"
              data-aos="fade-right"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" }, // Responsive font size
              }}
            >
              <StarRateIcon fontSize="inherit" /> Get To Know Us
            </Typography>
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ p: 2 }}
              component="h2"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Travel place for You & your Family
            </Typography>
            <Typography
              variant="h5"
              data-aos="fade-right"
              data-aos-delay="400"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              100K+ Happy Customers
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                mb: 2,
              }}
              data-aos="fade-right"
              data-aos-delay="600"
            >
              <AvatarGroup max={4}>
                {/* Avatars */}
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
                />
                <Avatar
                  alt="Travis Howard"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww"
                />
                <Avatar
                  alt="Agnes Walker"
                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
                />
                <Avatar
                  alt="Trevor Henderson"
                  src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"
                />
              </AvatarGroup>
            </Box>
            <Typography
              variant="h5"
              data-aos="fade-right"
              data-aos-delay="800"
              sx={{
                fontSize: { xs: "1.5rem", md: "2rem" }, // Responsive font size
              }}
            >
              We have more than 10 years of experience
            </Typography>
            <List>
              <ListItem data-aos="fade-up" data-aos-delay="1000">
                <ListItemIcon>
                  <CheckCircleIcon
                    style={{ color: "#1586FD", fontSize: "40px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontWeight: 500, color: "secondary.main" }}
                  primary="Generation Technology"
                />
              </ListItem>
              <ListItem data-aos="fade-up" data-aos-delay="1200">
                <ListItemIcon>
                  <CheckCircleIcon
                    style={{ color: "#1586FD", fontSize: "40px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontWeight: 500, color: "secondary.main" }}
                  primary="Innovative Solutions"
                />
              </ListItem>
              <ListItem data-aos="fade-up" data-aos-delay="1400">
                <ListItemIcon>
                  <CheckCircleIcon
                    style={{ color: "#1586FD", fontSize: "40px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontWeight: 500, color: "secondary.main" }}
                  primary="Audio Performance"
                />
              </ListItem>
            </List>
          </Box>
        </Grid>

        {/* Right Grid Item */}
        {!isSmallScreen && ( // Conditionally render based on screen size
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              data-aos="fade-left"
              sx={{
                padding: { xs: 0, md: 2 },
                margin: { xs: 0, md: "auto" },
              }}
            >
              <Box>
                <Image
                  src={img}
                  layout="responsive"
                  width={500}
                  height={300}
                  alt="Waiting for adventures"
                  style={{ borderRadius: 8 }}
                />
              </Box>
              <Typography
                variant="h4"
                fontWeight={500}
                fontStyle="oblique"
                component="h3"
                align="center"
                mt={2}
                data-aos="fade-left"
                data-aos-delay="200"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                Waiting for adventures? Don&apos;t miss them
              </Typography>
              <Typography
                variant="body1"
                align="center"
                data-aos="fade-left"
                data-aos-delay="400"
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                }}
              >
                We don&apos;t just work with concrete and steel. We are
                approachable, with even our highest concrete and steel. We work
                with people.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default KnowAboutUs;
