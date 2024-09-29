"use client";
import img from "@/assets/images/Img-01.jpg";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import CommuteIcon from "@mui/icons-material/Commute";
import PublicIcon from "@mui/icons-material/Public";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Image from "next/image";

import { useGetAllTeamMembersQuery } from "@/redux/api/teamApi";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AboutUs = () => {
  const { data, isLoading } = useGetAllTeamMembersQuery("");
  return (
    <Container>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            mt: 15,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 15,
          }}
        >
          The Story About Us
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              <Image src={img} alt="About Us" width={500} height={400} />
            </Box>
          </Grid>
          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                p: 2,
              }}
            >
              We have been in the tourism industry for more than 20 years.
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <AirplanemodeActiveIcon
                style={{
                  color: "#1586FD",
                  fontSize: "60px",
                  marginRight: "8px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  p: 2,
                  color: "secondary.main",
                }}
              >
                Leave your guidebooks at home and dive into the local cultures
                that make each destination so special. We’ll connect you with
                our exclusive experiences.
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <PublicIcon
                style={{
                  color: "#1586FD",
                  fontSize: "60px",
                  marginRight: "8px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  p: 2,
                  color: "secondary.main",
                }}
              >
                Each trip is carefully crafted to leave you free to live in the
                moment and enjoy your vacation.
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <CommuteIcon
                style={{
                  color: "#1586FD",
                  fontSize: "60px",
                  marginRight: "8px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  p: 2,
                  color: "secondary.main",
                }}
              >
                Dive into Culture - Each trip is carefully crafted to leave you
                free to live in the moment and enjoy your vacation.
              </Typography>
            </Box>
            <Button variant="contained" color="primary">
              Book Now!
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Container
        sx={{
          mb: 15,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 600,
              mt: 15,
              mb: 15,
              color: "primary.main",
              textAlign: "center",
            }}
          >
            Frequently Asked Questions
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Can I modify my booking after confirmation?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  Yes, you can easily modify your booking details after
                  confirmation. Simply log in to your account or contact our
                  support team for assistance.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  What is your cancellation policy?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  Our cancellation policy varies depending on the type of
                  booking. Please refer to our terms and conditions page or
                  contact our customer service for detailed information.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  How do I get a refund for my purchase?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  Refunds are processed according to our refund policy. Contact
                  our support team with your order details to initiate the
                  refund process.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel8a-content"
                id="panel8a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Do you offer group discounts?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  Yes, we offer special discounts for group bookings. Contact
                  our sales team for more information on group rates and
                  discounts.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  What payment methods do you accept?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  We accept various payment methods including credit/debit
                  cards, PayPal, and bank transfers. Contact our support team if
                  you have specific payment inquiries.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12} md={6}>
            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  How can I track my order?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  You can track your order status by logging into your account
                  or by using the tracking information provided in your order
                  confirmation email.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Are there any hidden fees?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  We are transparent about our pricing and do not have any
                  hidden fees. All applicable charges are clearly mentioned
                  during the booking process.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel7a-content"
                id="panel7a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Can I upgrade my membership plan?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  Yes, you can upgrade your membership plan at any time. Contact
                  our customer service team to learn more about available
                  upgrade options.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                sx={{
                  p: 2,
                }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel9a-content"
                id="panel9a-header"
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  What is your customer support availability?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  Our customer support team is available 24/7 to assist you with
                  any queries or concerns. Feel free to reach out to us via
                  phone, email, or live chat.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          mb: 5,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 600,
            mt: 15,
            mb: 15,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          Team & Founders
        </Typography>
        {isLoading ? (
          <Box>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {data &&
              data?.map((member: any, index: number) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card>
                    <Box
                      sx={{
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Image
                        src={member.profilePhoto}
                        alt={member.name}
                        width={300}
                        height={200}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h5" sx={{ fontWeight: 500 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {member.designation}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton href={member.facebookURL} target="_blank">
                        <Facebook />
                      </IconButton>
                      <IconButton href={member.instagramURL} target="_blank">
                        <Twitter />
                      </IconButton>
                      <IconButton href={member.linkedinURL} target="_blank">
                        <LinkedIn />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default AboutUs;
