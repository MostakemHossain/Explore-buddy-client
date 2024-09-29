import { Box, Grid, Paper, Typography } from "@mui/material";

const AdminPage = () => {
  // Static data for demonstration
  const totalUsers = 120;
  const totalTrips = 85;
  const totalBookings = 230;
  const totalRevenue = 52300; // in USD

  return (
    <Box p={4}>
      <Typography variant="h3" color="primary.main" gutterBottom>
        Welcome to Admin Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Manage users, trips, bookings, and get insights into platform
        performance.
      </Typography>

      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h5" color="secondary.main">
              Total Users
            </Typography>
            <Typography variant="h4" color="primary.main">
              {totalUsers}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h5" color="secondary.main">
              Total Trips
            </Typography>
            <Typography variant="h4" color="primary.main">
              {totalTrips}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h5" color="secondary.main">
              Total Bookings
            </Typography>
            <Typography variant="h4" color="primary.main">
              {totalBookings}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h5" color="secondary.main">
              Total Revenue
            </Typography>
            <Typography variant="h4" color="primary.main">
              ${totalRevenue.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={6}>
        <Typography variant="body1">
          This is the admin dashboard where you can oversee platform statistics,
          manage trips, users, and monitor revenue. Stay up to date with the
          latest activities on the platform.
        </Typography>
      </Box>
    </Box>
  );
};

export default AdminPage;
