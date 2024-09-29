import { getUserInfo } from "@/services/auth.services";
import { UserRole } from "@/types";
import { drawerItems } from "@/utils/drawerItems";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [useRole, setUserRole] = useState("");
  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);

  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "17px",
        }}
      >
        <Typography variant="h5" component={Link} href="/" fontWeight={600}>
          <Box component={"span"} color={"primary.main"}>
            E
          </Box>
          xplore{" "}
          <Box component={"span"} color={"primary.main"}>
            B
          </Box>
          uddy
        </Typography>
      </Stack>
      <List>
        {drawerItems(useRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
