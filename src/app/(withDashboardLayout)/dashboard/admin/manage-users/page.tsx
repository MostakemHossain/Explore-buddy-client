"use client";
import {
  useGetAllUsersQuery,
  useUpdateUsersMutation,
} from "@/redux/api/manageUserApi";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "BLOCKED";
  isDeleted: boolean;
};

type Changes = {
  [key: string]: {
    role?: string;
    status?: string;
    isDeleted?: boolean;
  };
};

const ManageUsers = () => {
  const { data, isLoading: isLoadingUsers } = useGetAllUsersQuery("");
  const [changes, setChanges] = useState<Changes>({});
  const [updateUsers, { isLoading: isUpdating }] = useUpdateUsersMutation();

  const handleChange = async (
    id: GridRowId,
    field: keyof User,
    value: string | boolean
  ) => {
    try {
      const change = {
        id,
        [field]: value,
      };
      // Optimistically update changes state
      setChanges((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        },
      }));

      // Perform updateUsers mutation immediately
      const res = await updateUsers(change).unwrap();
      if (res.id) {
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => {
        const { id, value } = params;
        const currentRole = changes[id]?.role || value;

        return (
          <FormControl fullWidth>
            <Select
              value={currentRole}
              onChange={(event) => handleChange(id, "role", event.target.value)}
              label="Role"
              sx={{
                "& .MuiSelect-select": {
                  color: "#fff",
                  backgroundColor:
                    currentRole === "USER"
                      ? "#1976d2"
                      : currentRole === "ADMIN"
                      ? "#388e3c"
                      : "#d32f2f",
                },
              }}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="SUPER_ADMIN">SUPER_ADMIN</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const { id, value } = params;
        const currentStatus = changes[id]?.status || value;

        return (
          <FormControl fullWidth>
            <Select
              value={currentStatus}
              onChange={(event) =>
                handleChange(id, "status", event.target.value)
              }
              label="Status"
              sx={{
                "& .MuiSelect-select": {
                  color: "#fff",
                  backgroundColor:
                    currentStatus === "ACTIVE" ? "#4caf50" : "#f44336",
                },
              }}
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="BLOCKED">BLOCKED</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "isDeleted",
      headerName: "Is Deleted",
      flex: 1,
      renderCell: (params) => {
        const { id, value } = params;
        const currentIsDeleted = changes[id]?.isDeleted ?? value;

        return (
          <FormControl fullWidth>
            <Select
              value={currentIsDeleted ? "true" : "false"}
              onChange={(event) =>
                handleChange(id, "isDeleted", event.target.value === "true")
              }
              label="Is Deleted"
              sx={{
                "& .MuiSelect-select": {
                  color: "#fff",
                  backgroundColor: currentIsDeleted ? "#d32f2f" : "#1976d2",
                },
              }}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: 3, backgroundColor: "#f0f4f8", borderRadius: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        sx={{ mb: 2 }}
      >
        <TextField
          size="medium"
          placeholder="Search users"
          variant="outlined"
          sx={{ width: "300px", backgroundColor: "#fff", borderRadius: 1 }}
        />
      </Stack>
      <Typography
        color={"primary"}
        variant="h4"
        sx={{
          mb: 2,
        }}
        fontWeight={600}
      >
        Manage Users
      </Typography>

      {!isLoadingUsers ? (
        <Box
          sx={{ backgroundColor: "#fff", borderRadius: 2, p: 2, boxShadow: 3 }}
        >
          <DataGrid
            rows={data || []}
            rowHeight={100}
            columns={columns}
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2",
                color: "#9b1f1f",
                "& .MuiDataGrid-columnHeaderTitle": {
                  marginBottom: "16px",
                },
              },
              "& .MuiDataGrid-cell": {
                padding: 2,
              },
              "& .MuiDataGrid-row:nth-of-type(odd)": {
                backgroundColor: "#f1f1f1",
              },
              "& .MuiDataGrid-row:nth-of-type(even)": {
                backgroundColor: "#e3f2fd",
              },
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
};

export default ManageUsers;
