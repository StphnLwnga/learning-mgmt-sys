"use client"

import { useTheme } from "next-themes"
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";
import { useEffect, useState } from "react";

/**
 * Renders the Sidebar component.
 *
 * @return {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = (): JSX.Element => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`h-full border-r flex flex-col overflow-y-auto shadow-sm ${isDarkTheme ? 'bg-[#020817]' : 'bg-white'}`}
    >
      <div className="-p-1">
        <Logo src={isDarkTheme ? '/CourseNoma-logos_white.png' : '/CourseNoma-logos_black.png'} />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes/>
      </div>
    </div>
  );
}

export default Sidebar;