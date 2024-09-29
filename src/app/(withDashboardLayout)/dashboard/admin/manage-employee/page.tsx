"use client";
import { useCreateATeamMutation } from "@/redux/api/teamApi";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema for form validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

const StylesInformationBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f4f7fe",
  borderRadius: theme.spacing(1),
  padding: "8px 16px",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "33.33%",
  },
  "& p": {
    fontWeight: 600,
  },
}));

const CreateATeam = () => {
  const [createATeam, { isLoading: createTeamLoading }] =
    useCreateATeamMutation();
  const [profileData, setProfileData] = useState({
    name: "",
    designation: "",
    facebook: "",
    instagram: "",
    linkedin: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState({ name: "", designation: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async () => {
    try {
      profileSchema.parse(profileData);
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      formData.append("data", JSON.stringify(profileData));
      const res = await createATeam(formData).unwrap();
      if (res.id) {
        toast.success("Created a team member successfully");
        // Clear the form fields
        setProfileData({
          name: "",
          designation: "",
          facebook: "",
          instagram: "",
          linkedin: "",
        });
        setSelectedFile(null);
        setPreview(null);
        setErrors({ name: "", designation: "" });
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        const validationErrors: any = {};
        e.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: 400,
              width: "100%",
              overflow: "hidden",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
            }}
          >
            {createTeamLoading ? (
              <CircularProgress />
            ) : preview ? (
              <Image src={preview} height={500} width={400} alt="user photo" />
            ) : (
              <PersonIcon sx={{ fontSize: 200, color: "#9e9e9e" }} />
            )}
          </Box>
          <Box sx={{ p: 2, mb: 2, mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ width: "100%" }}
            >
              Choose Your Profile Photo
              <input type="file" hidden onChange={fileUploadHandler} />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" color={"primary.main"}>
            Basic Information
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            <TextField
              label="Designation"
              name="designation"
              value={profileData.designation}
              onChange={handleInputChange}
              error={!!errors.designation}
              helperText={errors.designation}
              fullWidth
            />
            <TextField
              label="Facebook"
              name="facebook"
              value={profileData.facebook}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Instagram"
              name="instagram"
              value={profileData.instagram}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="LinkedIn"
              name="linkedin"
              value={profileData.linkedin}
              onChange={handleInputChange}
              fullWidth
            />
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            startIcon={<ModeEditIcon />}
            sx={{ mt: 2 }}
            fullWidth
          >
            Create A Team Member
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateATeam;
