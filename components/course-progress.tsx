"use client"

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  size?: "default" | "sm";
  value: number;
  variant?: "default" | "success";
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-600",
}

const CourseProgress = ({ size, value, variant }: CourseProgressProps) => {
  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  return (
    <div className="">
      <Progress value={value} variant={variant} className="h-2" />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          sizeByVariant[size || "default"],
          colorByVariant[variant || "default"],
          isDarkTheme && "text-emerald-500",
        )}
      >
        {Math.round(value)}% Complete
      </p>
    </div>
  );
}

export default CourseProgress;