"use client"

import { useState, useEffect } from "react";
import { SignOutButton, SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import { ModeToggle } from "./ui/mode-toggle";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { isInstructor } from "@/lib/instructor";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import SearchInput from "./search-input";

const NavbarRoutes = (): JSX.Element => {
  const { userId } = useAuth();

  const pathname = usePathname();

  const router = useRouter();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  const [isInstructorMode, setIsInstructorMode] = useState(false);
  const [navFromSwitch, setNavFromSwitch] = useState(false);

  const handleInstructorSwitch = () => {
    setNavFromSwitch(true);
    setIsInstructorMode(!isInstructorMode);
  }

  const isCreatorPage = pathname?.startsWith("/creator") || pathname?.startsWith("/creator/courses");
  const isPlayerPage = pathname?.startsWith("/courses");
  const isSearchPage = pathname === "/search";

  useEffect(() => {
    if (navFromSwitch)
      router.push(isInstructorMode ? "/creator/courses" : "/");
    // setNavFromSwitch(false);
  }, [isInstructorMode, navFromSwitch, pathname, router]);

  useEffect(() => {
    if (isCreatorPage) {
      setIsInstructorMode(true);
      setNavFromSwitch(false);
    }
  }, [isCreatorPage, isInstructorMode, navFromSwitch]);

  return (
    <div className="z-55 flex w-full">
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-6 ml-auto items-center pr-4">
        {/* {userId && isInstructor(userId) && ( */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={isInstructorMode} id="instructor-mode"
              onCheckedChange={handleInstructorSwitch}
              className={cn("data-[state=checked]:bg-sky-700", isDarkTheme && "data-[state=checked]:bg-sky-300/30")}
            />
            <Label htmlFor="instructor-mode"
              className={cn("text-slate-600 hover:text-slate-700", isDarkTheme && "text-slate-200 hover:text-slate-300")}
            >
              Instructor Mode
            </Label>
          </div>
        {/* )} */}
        <ModeToggle />
        <SignedIn>
          <UserButton afterSignOutUrl="/sign-in" />
        </SignedIn>
      </div>
    </div>
  );
}

export default NavbarRoutes;
