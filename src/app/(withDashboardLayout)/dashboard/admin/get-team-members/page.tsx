"use client";
import {
  useDeleteAEmployeeMutation,
  useGetAllTeamMembersQuery,
} from "@/redux/api/teamApi";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import DeleteTeamModal from "./components/DeleteTeamMember";

const AllEmployees = () => {
  const { data, isLoading } = useGetAllTeamMembersQuery("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [deleteAEmployee, { isLoading: deleteAEmployeeLoadin }] =
    useDeleteAEmployeeMutation();

  const handleDelete = (id: string) => {
    setSelectedTripId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedTripId) {
      try {
        const res = await deleteAEmployee(selectedTripId).unwrap();
        if (res.id) {
          toast.success("Employee Deleted Successfully");
        }
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsModalOpen(false);
        setSelectedTripId(null);
      }
    }
  };

  const defaultAvatarUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMaPwpClKq_MJ8fYhr9yhhpQKq-MGSDHw4-g&s";

  const columns: GridColDef[] = [
    {
      field: "profilePhoto",
      headerName: "Photo",
      flex: 1,
      sortable: true,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            mt: "15px",
          }}
        >
          <Image
            src={params.value || defaultAvatarUrl}
            alt="profile"
            width={50}
            height={50}
            style={{ width: 50, height: 50, borderRadius: "50%" }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultAvatarUrl;
            }}
          />
        </Box>
      ),
    },
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    {
      field: "designation",
      headerName: "Designation",
      flex: 1,
      sortable: true,
    },
    {
      field: "facebook",
      headerName: "Facebook",
      flex: 1,
      sortable: true,
      renderCell: (params) =>
        params.value ? (
          <IconButton
            component="a"
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
        ) : null,
    },
    {
      field: "instagram",
      headerName: "Instagram",
      flex: 1,
      sortable: true,
      renderCell: (params) =>
        params.value ? (
          <IconButton
            component="a"
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </IconButton>
        ) : null,
    },
    {
      field: "linkedin",
      headerName: "LinkedIn",
      flex: 1,
      sortable: true,
      renderCell: (params) =>
        params.value ? (
          <IconButton
            component="a"
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
        ) : null,
    },
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
          <Link href={`/dashboard/admin/get-team-members/${params.id}`}>
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
      <DeleteTeamModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onConfirm={confirmDelete}
      />
      <Typography color="primary.main" variant="h4" fontWeight={600} mb={2}>
        ALL Member & Employee
      </Typography>

      {!isLoading ? (
        <Box>
          <DataGrid
            rows={data || []}
            columns={columns}
            autoHeight
            sortingOrder={["asc", "desc"]}
            rowHeight={80}
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

export default AllEmployees;
