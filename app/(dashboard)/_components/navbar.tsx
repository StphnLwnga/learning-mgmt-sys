"use client"

import { useTheme } from "next-themes";
import MobileSidebar from "./mobile-sidebar";

const Navbard = (): JSX.Element => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div className={`p-4 border-b h-full flex items-center shadow-sm ${isDarkTheme ? 'bg-[#020817]' : 'bg-white'}`}>
      <MobileSidebar isDarkTheme={isDarkTheme} />
    </div>
  );
}

export default Navbard;