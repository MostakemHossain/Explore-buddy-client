"use client";
import { logoutUser } from "@/services/actions/logOutUser";
import { getUserInfo } from "@/services/auth.services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();
  const handleLogout = () => {
    logoutUser(router);
  };
  return (
    <>
      {userInfo?.userId ? (
        <Button color="error" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
