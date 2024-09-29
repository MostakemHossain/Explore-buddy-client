"use client";

import ExploreBuddyForm from "@/components/Forms/ExploreBuddyForm";
import ExploreBuddyInput from "@/components/Forms/ExploreBuddyInput";
import { authKey } from "@/constants/authKey";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyIcon from "@mui/icons-material/Key";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { deleteCookies } from "../../../../services/actions/deleteCookies";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const validationSchema = z.object({
  oldPassword: z.string().min(6, "Must be at least 6 characters long"),
  newPassword: z.string().min(6, "Must be at least 6 characters long"),
});

const ChangePassword = () => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await changePassword(values).unwrap();

      if (res.message === "Password change successfully") {
        toast.success("Password Change Successfully");

        localStorage.removeItem(authKey);
        deleteCookies([authKey, "refreshToken"]);
        router.push("/");
        router.refresh();
      } else {
        toast.error("Password Incorrect");
      }
    } catch (error) {
      toast.error("Password Incorrect");
    }
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 600,
        width: "100%",
        boxShadow: 1,
        borderRadius: 1,
        mx: "auto",
        mt: {
          xs: 2,
          md: 5,
        },
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Box
          sx={{
            "& svg": {
              width: 100,
              height: 100,
            },
          }}
        >
          <KeyIcon sx={{ color: "primary.main" }} />
        </Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: -1.5 }}>
          Change password
        </Typography>
      </Stack>
      <ExploreBuddyForm
        onSubmit={onSubmit}
        defaultValues={{ oldPassword: "", newPassword: "" }}
        resolver={zodResolver(validationSchema)}
      >
        <Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ExploreBuddyInput
              required
              name="oldPassword"
              type="password"
              label="Old Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ExploreBuddyInput
              required
              name="newPassword"
              type="password"
              label="New Password"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button type="submit" sx={{ width: "100%", my: 2 }}>
          Change Password
        </Button>
      </ExploreBuddyForm>
    </Box>
  );
};

export default ChangePassword;
