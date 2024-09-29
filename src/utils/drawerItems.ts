import { userRole } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";
import BackpackIcon from "@mui/icons-material/Backpack";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ExploreIcon from "@mui/icons-material/Explore";
import Groups2Icon from "@mui/icons-material/Groups2";
import KeyIcon from "@mui/icons-material/Key";
import LuggageIcon from "@mui/icons-material/Luggage";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];
  const defaultMenus = [
    {
      title: "profile",
      path: `${role}/profile`,
      icon: PersonIcon,
    },
    {
      title: "change Password",
      path: `change-password`,
      icon: KeyIcon,
    },
  ];
  switch (role) {
    case userRole.ADMIN:
      roleMenus.push(
        {
          title: "DashBoard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Create Trip",
          path: `${role}/create-trip`,
          icon: BackpackIcon,
        },
        {
          title: "My-trip",
          path: `${role}/my-trips`,
          icon: CardTravelIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/manage-users`,
          icon: PeopleIcon,
        },

        {
          title: "Requested Travel Buddy",
          path: `${role}/requested-travel-buddy`,
          icon: ExploreIcon,
        },
        {
          title: "Add Team member & Employees",
          path: `${role}/manage-employee`,
          icon: Diversity3Icon,
        },
        {
          title: "All Team member & Employees",
          path: `${role}/get-team-members`,
          icon: Groups2Icon,
        },
        {
          title: "User Contact Information",
          path: `${role}/user-contact-information`,
          icon: ContactMailIcon,
        }
      );
      break;
    case userRole.SUPER_ADMIN:
    case userRole.USER:
      roleMenus.push(
        {
          title: "DashBoard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "My Requested Trip",
          path: `${role}/my-trip`,
          icon: LuggageIcon,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
