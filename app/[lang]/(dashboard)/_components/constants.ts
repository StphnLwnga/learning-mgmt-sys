import { Layout, Compass, List, BarChart, LucideIcon } from "lucide-react";

export type NavRoute = {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const guestRoutes: NavRoute[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: Layout,
  },
  {
    label: "Browse",
    href: "/search",
    icon: Compass,
  },
];

export const creatorRoutes = [
  {
    label: "Courses",
    href: "/creator/courses",
    icon: List,
  },
  {
    label: "Analytics",
    href: "/creator/analytics",
    icon: BarChart,
  },
]