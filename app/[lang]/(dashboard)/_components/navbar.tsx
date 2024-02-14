"use client"

import { useTheme } from "next-themes";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";
import { useState, useEffect } from "react";
import { Locale } from "@/i18n";

const Navbar = ({ lang, dict }: { lang: Locale, dict: Record<string, any> }): JSX.Element => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={`p-4 border-b h-full flex items-center shadow-sm`}>
      <MobileSidebar
        isDarkTheme={resolvedTheme === 'dark'}
        dict={dict}
        lang={lang}
      />
      <NavbarRoutes />
    </div>
  );
}

export default Navbar;