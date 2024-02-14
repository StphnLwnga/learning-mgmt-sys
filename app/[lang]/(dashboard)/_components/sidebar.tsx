"use client"

import { useTheme } from "next-themes"
import Logo from "./logo";
import SidebarRoutes from "./sidebar-routes";
import { Separator } from "@/components/ui/separator";
import { Locale } from "@/i18n";

/**
 * Renders the Sidebar component.
 *
 * @return {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = ({lang, dict}: {lang: Locale, dict: Record<string, any>}): JSX.Element => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`h-full border-r flex flex-col overflow-y-auto shadow-sm bg-transparent`}
    >
      <div className="-p-1 flex flex-col">
        <Logo isDarkTheme={resolvedTheme === 'dark'} />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <Separator className="w-[88%] -top-5" />
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes lang={lang} dict={dict} />
      </div>
    </div>
  );
}

export default Sidebar;