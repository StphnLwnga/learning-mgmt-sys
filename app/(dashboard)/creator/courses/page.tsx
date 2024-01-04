"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";

const CoursesPage = (): JSX.Element => {
  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  return (
    <div className="p-6">
      <Link href='/creator/create'>
        <Button
          variant="outline"
          className={cn(
            "text-slate-600 hover:text-slate-700 bg-slate-300/20 hover:bg-sky-400/20",
            isDarkTheme && "text-slate-200 hover:text-slate-300"
          )}
        >
          New Course
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}

export default CoursesPage;