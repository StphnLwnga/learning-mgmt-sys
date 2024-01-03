"use client"

import { SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ui/mode-toggle";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const NavbarRoutes = (): JSX.Element => {
  const pathname = usePathname();
  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const isCreatorPage = pathname?.startsWith("/creator");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-6 ml-auto items-center pr-4">
      {isCreatorPage || isPlayerPage ? (
        <Link href="/">
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "text-slate-600 hover:text-slate-700",
              isDarkTheme && "text-slate-200 hover:text-slate-300"
            )}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/creator/courses">
          <Button
            size="sm"
            variant="ghost"
            className={cn(
              "text-slate-600 hover:text-slate-700",
              isDarkTheme && "text-slate-200 hover:text-slate-300"
            )}
          >
            Creator Mode
          </Button>
        </Link>
      )}
      <ModeToggle />
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
    </div>
  );
}

export default NavbarRoutes;