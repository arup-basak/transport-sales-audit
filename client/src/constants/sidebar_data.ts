import { HomeIcon, LayoutDashboardIcon, FileTextIcon, SettingsIcon, UserIcon, Shield } from "lucide-react";

const sidebar_data = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Row 1",
    href: "/row1",
    icon: FileTextIcon,
  },
  {
    label: "Row 2",
    href: "/row2",
    icon: SettingsIcon,
  },
  {
    label: "Row 3",
    href: "/row3",
    icon: HomeIcon,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserIcon,
  },
  {
    label: "Admin",
    href: "/admin",
    icon: Shield,
  },
];

export default sidebar_data;
