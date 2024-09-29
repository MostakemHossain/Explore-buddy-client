"use client";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.services";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UserLoginType } from "./page";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const [error, setError] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginType>();

  const onSubmit: SubmitHandler<UserLoginType> = async (
    values: UserLoginType
  ) => {
    try {
      const res = await loginUser(values).unwrap();
      if (res.accessToken) {
        toast.success("User login successfully");
        storeUserInfo({ accessToken: res.accessToken });
        router.push("/dashboard");
      }
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      if (errorMessage.toLowerCase().includes("refresh token")) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(errorMessage);
      }
      toast.error(errorMessage);
      setError(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 400,
            padding: 4,
            backgroundColor: "#fff",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{
              fontFamily: "fantasy",
            }}
            component="h1"
            color={"primary.main"}
            variant="h4"
          >
            Login
          </Typography>
          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "4px",
                  borderRadius: "5px",
                  color: "white",
                  mt: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              {...register("email", { required: "Email is required" })}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {errors.email && (
              <Typography color="error">{errors.email.message}</Typography>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              {...register("password", { required: "Password is required" })}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && (
              <Typography color="error">{errors.password.message}</Typography>
            )}
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 1 }}>
              <Link
                style={{
                  color: "#1586FD",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In
            </Button>
            <Box display="flex" justifyContent="flex-end">
              <Box sx={{}}>
                Don&apos;t have an account?{" "}
                <Link
                  style={{
                    color: "#1586FD",
                    textDecoration: "underline",
                    fontWeight: "bold",
                    paddingLeft: "1px",
                  }}
                  href="/register"
                >
                  Sign Up
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
