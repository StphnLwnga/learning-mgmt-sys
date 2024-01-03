import { Layout, Compass, List, BarChart } from "lucide-react";

export const guestRoutes = [
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