"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

/**
 * Renders a mode toggle component.
 *
 * @return {JSX.Element} The rendered mode toggle component.
 */
export function ModeToggle(): JSX.Element {
  const { setTheme, theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = (): void => {
    setTheme(isDarkTheme ? "light" : "dark");
    setIsDarkTheme(!isDarkTheme);
  }

  useEffect(() => {
    setIsDarkTheme(theme === "dark");
  }, [theme]);

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={toggleTheme}
      >
        {!isDarkTheme ? (
          <SunIcon color="#0369A1" className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 z-55" />
        ) : (
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 z-55" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>

  )
}
