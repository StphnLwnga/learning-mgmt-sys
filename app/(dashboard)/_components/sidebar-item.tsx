"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

/**
 * Renders a sidebar item.
 *
 * @param {Object} props - The props object.
 * @param {React.ComponentType} props.icon - The icon component.
 * @param {string} props.label - The label of the sidebar item.
 * @param {string} props.href - The URL of the sidebar item.
 * @return {JSX.Element} The rendered sidebar item.
 */
const SidebarItem = ({
  icon: Icon,
  label,
  href
}: SidebarItemProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (theme === "dark") setIsDarkTheme(true);
    else if (theme === "light") setIsDarkTheme(false);
  }, [theme]);

  const isActive = (pathname === "/" && href === "/")
    || pathname === href
    || pathname?.startsWith(`${href}/`);

  const onClick = () => router.push(href);

  return (
    <button onClick={onClick} type="button" className={cn(
      "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
      isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700",
      isDarkTheme && "hover:bg-slate-700/20 hover:text-slate-300 text-slate-300",
    )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-sky-700",
            isDarkTheme && "text-slate-300"
          )}
        />
        {label}
      </div>
      <div className={
        cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isDarkTheme && "border-slate-300",
          isActive && "opacity-100"
        )} />
    </button>
  );
}

export default SidebarItem;