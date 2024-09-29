import { DrawerItem } from "@/types";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};
const SidebarItem = ({ item }: IProps) => {
  const linkpath = `/dashboard/${item.path}`;
  const pathname = usePathname();
  return (
    <Link href={linkpath}>
      <ListItem
        disablePadding
        sx={{
          ...(pathname === linkpath
            ? {
                borderRight: "3px solid #1586FD",
                "& svg": {
                  color: "#1586FD",
                },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
