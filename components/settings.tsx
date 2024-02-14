"use client"

import React, { useState, useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { IconType } from "react-icons";
import { FcSettings } from "react-icons/fc";
import { FaLanguage } from "react-icons/fa6";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";

import { Button } from "@/components/ui/button";
import TooltipComponent from "@/components/tooltip-component";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconBadge from "@/components/icon-badge";


const menuItems: { name?: string; icon?: IconType, }[] = [
  { name: "Language", icon: FaLanguage },
  { name: "Logout", icon: IoMdLogOut },
];

const languages: string[] = [
  "English", "French", "Swahili"
];

const Settings = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  const { resolvedTheme } = useTheme();

  const [currentLanguage, setCurrentLanguage] = useState("English");

  return (
    <TooltipComponent
      tooltipTrigger={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full"
              size="icon"
            >
              <FcSettings className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {menuItems.map((item, i) => {
                switch (true) {
                  case item.name === "Language":
                    return (
                      <DropdownMenuSub key={`sub-${i}`}>
                        <DropdownMenuSubTrigger className="hover:cursor-pointer gap-x-1">
                          {item.icon && (
                            <IconBadge icon={item.icon} variant={resolvedTheme === 'dark' ? "ghostDark" : "ghostLight"} />
                          )}
                          {item.name}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup value={currentLanguage} onValueChange={setCurrentLanguage}>
                              {languages.map((lang, i) => (
                                <DropdownMenuRadioItem value={lang} key={`sub-lang-${i}`}>
                                  {lang}
                                </DropdownMenuRadioItem>
                              ))}
                            </DropdownMenuRadioGroup>

                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    );

                  default:
                    return (
                      <>
                        <DropdownMenuSeparator key={`sub-${i}`} />
                        <DropdownMenuItem
                          key={`sub-${i}`}
                          className="hover:cursor-pointer gap-x-1"
                          onClick={() => item.name === "Logout" && signOut(() => router.push("/"))}
                        >
                          {item.icon && (
                            <IconBadge icon={item.icon} variant={resolvedTheme === 'dark' ? "ghostDark" : "ghostLight"} />
                          )}
                          {item.name}
                        </DropdownMenuItem>
                      </>
                    );
                }
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      tooltipContent="Settings"
    />
  );
}

export default Settings;