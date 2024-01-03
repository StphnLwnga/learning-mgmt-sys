"use client"

import { useTheme } from "next-themes";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";
import { useState, useEffect } from "react";

const Navbar = (): JSX.Element => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  return (
    <div className={`p-4 border-b h-full flex items-center shadow-sm ${isDarkTheme ? 'bg-[#020817]' : 'bg-white'}`}>
      <MobileSidebar isDarkTheme={isDarkTheme} />
      <NavbarRoutes />
    </div>
  );
}

export default Navbar;