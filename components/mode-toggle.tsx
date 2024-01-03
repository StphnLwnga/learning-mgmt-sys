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
  const [currentTheme, setCurrentTheme] = useState(theme);

  const toggleTheme = (): void => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  }

  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
