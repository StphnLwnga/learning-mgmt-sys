"use client"

import { useTheme } from "next-themes"
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";

/**
 * Renders the Sidebar component.
 *
 * @return {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-full border-r flex flex-col overflow-y-auto shadow-sm ${theme==='dark' ? 'bg-[#020817]' : 'bg-white'}`}
    >
      <div className="-p-1">
        <Logo src={theme === 'dark' ? '/CourseNoma-logos_white.png' : '/CourseNoma-logos_black.png'} />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes/>
      </div>
    </div>
  );
}

export default Sidebar;