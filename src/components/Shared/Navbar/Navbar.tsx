"use client";
import ToggleSwitch from "@/components/ToggleButton/ToggleButton";
import { useGetMyProfileQuery } from "@/redux/api/userApi";
import { isLoggedIn } from "@/services/auth.services";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data, isLoading } = useGetMyProfileQuery({});
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    {
      ssr: false,
    }
  );

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Tours", path: "/tour-page" },
    { title: "Contact Us", path: "/contact-us" },
    ...(isLoggedIn() ? [{ title: "Dashboard", path: "/dashboard" }] : []),
  ];

  if (!mounted) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Box
        sx={{
          ml: {
            sx: 4,
            lg: 10,
          },
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            sx={{ flexGrow: 1, color: "black", textDecoration: "none" }}
          >
            <Box component={"span"} color={"primary.main"}>
              E
            </Box>
            xplore{" "}
            <Box component={"span"} color={"primary.main"}>
              B
            </Box>
            uddy
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                <Box
                  sx={{
                    width: 250,
                  }}
                  role="presentation"
                  onClick={handleDrawerToggle}
                  onKeyDown={handleDrawerToggle}
                >
                  <List>
                    {navLinks.map((link) => (
                      <ListItem
                        button
                        key={link.path}
                        component={Link}
                        href={link.path}
                      >
                        <ListItemText
                          primary={link.title}
                          primaryTypographyProps={{
                            color:
                              pathname === link.path
                                ? "primary.main"
                                : "text.primary",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Stack direction="row" spacing={4} alignItems="center">
              {navLinks.map((link) => (
                <Typography
                  key={link.path}
                  component={Link}
                  href={link.path}
                  sx={{
                    textDecoration: "none",
                    color:
                      pathname === link.path ? "primary.main" : "text.primary",
                  }}
                >
                  {link.title}
                </Typography>
              ))}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                

                <AuthButton />
                {data?.role && (
                  <Stack
                    direction={"row"}
                    gap={3}
                    sx={{
                      marginLeft: "40px",
                      marginRight: "30px",
                    }}
                  >
                    {data?.role && (
                      <Link
                        href={`/dashboard/${data.role.toLowerCase()}/profile`}
                      >
                        <Avatar alt={data?.name} src={data?.profilePhoto} />
                      </Link>
                    )}
                  </Stack>
                )}
              </Box>
            </Stack>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
