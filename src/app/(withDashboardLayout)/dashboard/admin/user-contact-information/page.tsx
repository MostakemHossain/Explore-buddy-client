"use client";
import { useGetUserContactQuery } from "@/redux/api/contactApi";
import { Box, Skeleton, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const ContactInformation = () => {
  const { data, isLoading } = useGetUserContactQuery("");

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    { field: "email", headerName: "Email", flex: 1, sortable: true },
    {
      field: "phoneNumber",
      headerName: "Contact Number",
      flex: 1,
      sortable: true,
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      sortable: true,
    },
  ];

  return (
    <Box>
      <Typography color="primary.main" variant="h4" fontWeight={600} mb={2}>
        ALL User Contact Information
      </Typography>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={data || []}
            columns={columns}
            autoHeight
            sortingOrder={["asc", "desc"]}
          />
        </Box>
      ) : (
        <Box width="100%" p={4}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}
    </Box>
  );
};

export default ContactInformation;
