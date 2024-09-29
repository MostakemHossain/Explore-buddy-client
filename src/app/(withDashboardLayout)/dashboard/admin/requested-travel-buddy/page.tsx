"use client";
import {
  useGetALLTripRequestQuery,
  useUpdateUserTripRequestMutation,
} from "@/redux/api/tripRequest";
import {
  Box,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const RequestedTravelBuddy = () => {
  const { data, isLoading } = useGetALLTripRequestQuery("");
  const [updateUserTripRequest, { isLoading: updateStatusLoading }] =
    useUpdateUserTripRequestMutation();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      const initialRows = data.map((item: any) => ({
        id: item.id.toString(),
        destination: item.trip.destination,
        budget: item.trip.budget,
        startDate: item.trip.startDate,
        endDate: item.trip.endDate,
        status: item.status,
      }));
      setRows(initialRows);
    }
  }, [data]);
  const handleStatusChange = async (event: any, id: string) => {
    const newStatus = event.target.value;
    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );

    try {
      const res = await updateUserTripRequest({ id, newStatus }).unwrap();
      if (res.id) {
        toast.success("Travel Requested Updated Successfully");
      }
    } catch (error) {
      console.error("Failed to save status change:", error);
      setRows((prevRows: any) =>
        prevRows.map((row: any) =>
          row.id === id
            ? { ...row, status: prevRows.find((r: any) => r.id === id).status }
            : row
        )
      );
    }
  };

  const columns: GridColDef[] = [
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      sortable: true,
    },
    { field: "budget", headerName: "Budget", flex: 1, sortable: true },
    { field: "startDate", headerName: "Start Date", flex: 1, sortable: true },
    { field: "endDate", headerName: "End Date", flex: 1, sortable: true },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(event) => handleStatusChange(event, params.id.toString())}
          fullWidth
        >
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="APPROVED">APPROVED</MenuItem>
          <MenuItem value="REJECTED">REJECTED</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        mb={2}
      >
        <TextField size="medium" placeholder="Search Trips" />
      </Stack>
      <Typography color="primary.main" variant="h4" fontWeight={600} mb={2}>
        Travel Buddy Request
      </Typography>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
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

export default RequestedTravelBuddy;
