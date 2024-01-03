"use client"

import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ui/mode-toggle";

const NavbarRoutes = (): JSX.Element => {
  return (
    <div className="flex gap-x-6 ml-auto items-center pr-4">
      <ModeToggle />
      <SignedIn>
        <UserButton  afterSignOutUrl="/sign-in" />
      </SignedIn>
    </div>
  );
}

export default NavbarRoutes;