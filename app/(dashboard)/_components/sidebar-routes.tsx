"use client"

import { Layout, Compass } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { guestRoutes, creatorRoutes } from "./constants";
import { usePathname } from "next/navigation";


/**
 * Renders the sidebar routes.
 *
 * @return {JSX.Element} The rendered sidebar routes.
 */
const SidebarRoutes = (): JSX.Element => {
  const pathname = usePathname(); 
  
  const isCreatorPage = pathname?.includes('/creator');

  const routes = isCreatorPage ? creatorRoutes : guestRoutes;

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