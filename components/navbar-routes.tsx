"use client"

import { SignOutButton, SignedIn, UserButton, useAuth } from "@clerk/nextjs";
import { ModeToggle } from "./ui/mode-toggle";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const NavbarRoutes = (): JSX.Element => {
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

  const isCreatorPage = pathname?.startsWith("/creator");
  const isPlayerPage = pathname?.includes("/chapter");

  useEffect(() => {
    console.log("Instructor mode: ", isInstructorMode);
    if (navFromSwitch)
      router.push(isInstructorMode ? "/creator/courses" : "/");
    // console.log({ isInstructorMode, navFromSwitch });
    // setNavFromSwitch(false);
  }, [isInstructorMode, navFromSwitch]);

  useEffect(() => {
    if (isCreatorPage || isPlayerPage) {
      setIsInstructorMode(true);
      setNavFromSwitch(false);
    }
    // console.log({ isInstructorMode, navFromSwitch });
  }, [isCreatorPage, isInstructorMode, isPlayerPage, navFromSwitch]);

  return (
    <div className="flex gap-x-6 ml-auto items-center pr-4">
      {/* {isCreatorPage || isPlayerPage ? (
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
      )} */}
      <div className="flex items-center space-x-2">
        <Switch
          checked={isInstructorMode} id="instructor-mode"
          onCheckedChange={handleInstructorSwitch}
          className={cn("data-[state=checked]:bg-sky-700", isDarkTheme && "data-[state=checked]:bg-sky-300/40")}
        />
        <Label htmlFor="instructor-mode"
          className={cn("text-slate-600 hover:text-slate-700", isDarkTheme && "text-slate-200 hover:text-slate-300")}
        >
          Instructor Mode
        </Label>
      </div>
      <ModeToggle />
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
    </div>
  );
}

export default NavbarRoutes;