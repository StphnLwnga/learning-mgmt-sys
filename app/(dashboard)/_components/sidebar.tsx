"use client"

import { useTheme } from "next-themes"
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

/**
 * Renders the Sidebar component.
 *
 * @return {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = (): JSX.Element => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  return (
    <div
      className={`h-full border-r flex flex-col overflow-y-auto shadow-sm bg-transparent`}
    >
      <div className="-p-1 flex flex-col">
        <Logo isDarkTheme={isDarkTheme} />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <Separator className="w-[88%] -top-5" />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
}

export default Sidebar;