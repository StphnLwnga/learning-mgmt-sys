"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react";
import Logo from "./logo";

/**
 * Renders the Sidebar component.
 *
 * @return {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-full border-r flex flex-col overflow-y-auto shadow-sm ${theme === 'light' ? 'bg-white text-black' : 'bg-[#020817] text-white'}`}
    >
      <div className="-p-1">
        <Logo src={theme === 'dark' ? '/CourseNoma-logos_white.png' : '/CourseNoma-logos_black.png'} />
      </div>
    </div>
  );
}

export default Sidebar;