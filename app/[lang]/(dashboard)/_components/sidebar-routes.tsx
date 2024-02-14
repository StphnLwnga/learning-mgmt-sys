"use client"

import { Layout, Compass } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { guestRoutes, creatorRoutes, NavRoute } from "./constants";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n";

const routesWithLocale = (routes: NavRoute[], locale: Locale, dict: Record<string, any>) => {
  return routes.map((route: NavRoute) => ({
    ...route,
    label: dict.sidebar[route.label.toLowerCase()],
    href: `/${locale}${route.href}`,
  }));
}

/**
 * Renders the sidebar routes.
 *
 * @return {JSX.Element} The rendered sidebar routes.
 */
const SidebarRoutes = ({ lang, dict }: { lang: Locale, dict: Record<string, any> }): JSX.Element => {
  const pathname = usePathname();

  const isCreatorPage = pathname?.includes(`${lang}/creator`);

  const routes = isCreatorPage 
    ? routesWithLocale(creatorRoutes, lang, dict) 
    : routesWithLocale(guestRoutes, lang, dict);

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