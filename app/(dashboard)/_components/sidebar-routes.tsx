"use client"

import { Layout, Compass } from "lucide-react";
import SidebarItem from "./sidebar-item";

const guestRoutes = [
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

/**
 * Renders the sidebar routes.
 *
 * @return {JSX.Element} The rendered sidebar routes.
 */
const SidebarRoutes = (): JSX.Element => {
  const routes = guestRoutes;

  return ( 
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.label}
          label={route.label}
          href={route.href}
          icon={route.icon}
        />
      ))}
    </div>
  );
}
 
export default SidebarRoutes;