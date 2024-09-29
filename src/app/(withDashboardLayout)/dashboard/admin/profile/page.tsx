"use client";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import {
  useGetMyOwnProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/api/myProfile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useState } from "react";
import ProfileUpdateModal from "../../user/profile/components/ProfileUpdateModal";

const StylesInformationBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#f4f7fe",
  borderRadius: theme.spacing(1),
  padding: "8px 16px",
  width: "40%",
  [theme.breakpoints.up("sm")]: {
    width: "50%",
  },
  [theme.breakpoints.up("md")]: {
    width: "33.33%",
  },
  "& p": {
    fontWeight: 600,
  },
}));

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetMyOwnProfileQuery(undefined);
  const [updateMyProfile, { isLoading: updatingProfile }] =
    useUpdateMyProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    updateMyProfile(formData);
  };

  return (
    <>
      <ProfileUpdateModal open={isModalOpen} setOpen={setIsModalOpen} id="id" />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
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
              {isLoading ? (
                <CircularProgress />
              ) : (
                data?.profilePhoto && (
                  <Image
                    src={data?.profilePhoto}
                    height={500}
                    width={400}
                    alt="user photo"
                  />
                )
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                backgroundColor: "primary.main",
                color: "#fff",
                mb: 2,
                mt: 2,
              }}
            >
              {updatingProfile ? (
                <Typography color={"#fff"}>Loading...</Typography>
              ) : (
                <AutoFileUploader
                  name="file"
                  label="Choose Your Profile Photo"
                  icon={<CloudUploadIcon />}
                  onFileUpload={fileUploadHandler}
                  variant="text"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "#fff",

                    ":hover": {
                      backgroundColor: "primary.dark",
                    },
                    "& .MuiButton-label": {
                      color: "#fff",
                    },
                  }}
                />
              )}
            </Box>
            <Button
              fullWidth
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4" color={"primary.main"}>
              Basic Information
            </Typography>
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              gap={2}
              flexWrap="wrap"
            >
              {data && (
                <>
                  <StylesInformationBox>
                    <Typography color={"secondary"} variant="caption">
                      Role{" "}
                    </Typography>
                    <Typography>{data?.role}</Typography>
                  </StylesInformationBox>
                  <StylesInformationBox>
                    <Typography color={"secondary"} variant="caption">
                      Name{" "}
                    </Typography>
                    <Typography>{data?.name}</Typography>
                  </StylesInformationBox>
                  <StylesInformationBox>
                    <Typography color={"secondary"} variant="caption">
                      Email{" "}
                    </Typography>
                    <Typography>{data?.email}</Typography>
                  </StylesInformationBox>
                  <StylesInformationBox>
                    <Typography color={"secondary"} variant="caption">
                      Status{" "}
                    </Typography>
                    <Typography color={"#119c34"}>{data?.status}</Typography>
                  </StylesInformationBox>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyProfile;
