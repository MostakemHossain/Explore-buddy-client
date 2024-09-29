import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container, Grid, Link, Stack, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bgcolor="rgb(17,26,34)" py={5}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography
              color={"#fff"}
              variant="h4"
              component={Link}
              href="/"
              fontWeight={600}
            >
              <Box component={"span"} color={"primary.main"}>
                E
              </Box>
              xplore{" "}
              <Box component={"span"} color={"primary.main"}>
                B
              </Box>
              uddy
            </Typography>
            <Typography color="#fff" py={1} variant="h6">
              12 Main tPt. London
            </Typography>
            <Typography color="#fff" py={1} variant="h6">
              +44 3656 4567
            </Typography>
            <Typography color="#fff" py={1} variant="h6">
              explorebuddy@gmail.com
            </Typography>
            <Stack direction={"row"} gap={4} justifyContent={"center"} py={3}>
              <FacebookIcon style={{ color: "#fff", fontSize: 30 }} />
              <TwitterIcon style={{ color: "#fff", fontSize: 30 }} />
              <LinkedInIcon style={{ color: "#fff", fontSize: 30 }} />
              <InstagramIcon style={{ color: "#fff", fontSize: 30 }} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color="#fff" variant="h5">
              About Us
            </Typography>
            <Link color="#fff" py={1} component="h6" display="block">
              Our Story
            </Link>
            <Link color="#fff" py={1} component="h6" display="block">
              Travel Blog & Tips
            </Link>
            <Link color="#fff" py={1} component="h6" display="block">
              Working With Us
            </Link>
            <Link color="#fff" py={1} component="h6" display="block">
              Be Our Partner
            </Link>
            <Link color="#fff" py={1} component="h6" display="block">
              Packages
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color="#fff" variant="h4">
              Support
            </Typography>
            <Link color="#fff" py={1} component="h6" display="block">
              Our Story
            </Link>
            <Link color="#fff" py={1} component="h6" display="block">
              Travel Blog & Tips
            </Link>
            <Link color="#fff" py={1} component="h6" display="block">
              Working With Us
            </Link>
            <Link color="#fff" py={1} component="h6" display="block">
              Be Our Partner
            </Link>
            <Link color="#fff" py={1} component="h6" display="block">
              Packages
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color="#fff" variant="h5">
              Pay Safely With Us
            </Typography>
            <Typography py={2} color="#fff" component="p">
              The payment is encrypted and transmitted securely with an SSL
              protocol.
            </Typography>
            <Typography color={"white"} variant={"h6"}>
              Privacy Policy || Terms & Conditions
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            marginTop: "20px",
            borderTop: "1px dashed lightgray",
          }}
        >
          <Typography py={1} variant="h5" color="#fff">
            © {currentYear} Explore Buddy. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
