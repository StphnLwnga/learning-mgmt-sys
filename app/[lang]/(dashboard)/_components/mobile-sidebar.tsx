"use client"

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Logo from "./logo";
import { Separator } from "@/components/ui/separator";
import Sidebar from "./sidebar";


const MobileSidebar = ({ isDarkTheme }: { isDarkTheme: boolean }): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu
          color={isDarkTheme ? '#cbd5e1' : 'rgb(71 85 105)'}
          aria-label="mobile menu"
          aria-controls="mobile-menu"
          aria-expanded={true}
        />
      </SheetTrigger>
      <SheetContent side="left" className="p-0" >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}

export default MobileSidebar;