"use client";
import {
  useCreateTravelBuddyRequestMutation,
  useDeleteMyTripMutation,
  useGetMyTripQuery,
} from "@/redux/api/tourApi";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { useDebounced } from "@/redux/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import DeleteTripModal from "./components/DeleteTripModal";
import RequestTripModal from "./components/RequestTripModal";

const MyTrip = () => {
  const { data: userProfile } = useGetMyProfileQuery({});
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetMyTripQuery({ ...query });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRequestModalOpen, setRequestIsModalOpen] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [requestedTrips, setRequestedTrips] = useState<string[]>([]);
  const [deleteMyTrip] = useDeleteMyTripMutation();
  const [createTravelBuddyRequest] = useCreateTravelBuddyRequestMutation();

  const handleDelete = (id: string) => {
    setSelectedTripId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedTripId) {
      try {
        const res = await deleteMyTrip(selectedTripId).unwrap();
        if (res.id) {
          toast("Tour Deleted Successfully");
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsModalOpen(false);
        setSelectedTripId(null);
      }
    }
  };

  const handleRequestTrip = (id: string, userId: string) => {
    setSelectedTripId(id);
    setSelectedUserId(userId);
    setRequestIsModalOpen(true);
  };

  const confirmRequestTrip = async () => {
    if (selectedTripId && selectedUserId) {
      try {
        const res = await createTravelBuddyRequest({
          id: selectedTripId,
          data: { userId: selectedUserId },
        }).unwrap();
        if (res.id) {
          setRequestedTrips([...requestedTrips, selectedTripId]);
          toast.success("Trip Requested Successfully");
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setRequestIsModalOpen(false);
        setSelectedTripId(null);
        setSelectedUserId(null);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "photos",
      headerName: "Photo",
      flex: 1,
      renderCell: (params) => {
        const photoSrc =
          params.value.length > 0 ? params.value[0] : "/default-image.jpg"; // Provide a default image path
        const isValidSrc =
          photoSrc.startsWith("/") || photoSrc.startsWith("http");

        return (
          <Image
            width={100}
            height={100}
            src={isValidSrc ? photoSrc : "/default-image.jpg"}
            alt="Trip Photo"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        );
      },
    },
    { field: "destination", headerName: "Destination", flex: 1 },
    { field: "budget", headerName: "Budget($)", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          style={{ width: "100%", marginTop: 1 }}
        >
          <Link href={`/dashboard/admin/my-trips/${params.id}`}>
            <IconButton
              sx={{
                color: "primary.main",
              }}
            >
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            sx={{
              color: "red",
            }}
            onClick={() => handleDelete(String(params.id))}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="medium"
          placeholder="Search Trips"
        />
      </Stack>
      <Typography
        color={"primary.main"}
        variant="h4"
        sx={{
          mb: 2,
        }}
        fontWeight={600}
      >
        My All Trips
      </Typography>
      <DeleteTripModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onConfirm={confirmDelete}
      />
      <RequestTripModal
        open={isRequestModalOpen}
        setOpen={setRequestIsModalOpen}
        onConfirm={confirmRequestTrip}
      />
      {!isLoading ? (
        <Box>
          <Typography color={"primary.main"} variant="h4" fontWeight={600}>
            <DataGrid
              //@ts-ignore
              rows={data}
              rowHeight={100}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              autoHeight
            />
          </Typography>
        </Box>
      ) : (
        <Box sx={{ width: "100%", p: 4 }}>
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

export default MyTrip;
