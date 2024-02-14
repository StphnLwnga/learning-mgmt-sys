// "use client"

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Box, LinearProgress } from '@mui/material';

interface CourseProgressProps {
  size?: "default" | "sm";
  value: number;
  variant?: "default" | "success";
  color?: "primary" | "success";
  t: Record<string, any>;
}

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-600",
}

const CourseProgress = ({ size, value, variant, color, t }: CourseProgressProps) => {
  return (
    <div className="">
      {/* <Progress value={value} variant={variant} className="h-2" /> */}
      <Box sx={{ width: '100%', backgroundColor: "#EDFDF6" }}>
        <LinearProgress
          variant="determinate"
          value={value}
          color={color}
          sx={{ 
            borderRadius: 5,
            '& .MuiLinearProgress-determinate': {
              backgroundColor: "#EDFDF6",
            },
            '& .MuiLinearProgress-bar1Determinate': {
              backgroundColor: color === "success" ? "#4CCBA1" : "",
            },
           }}
        />
      </Box>
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          sizeByVariant[size || "default"],
          colorByVariant[variant || "default"],
        )}
      >
        {Math.round(value)}% {t.course.complete}
      </p>
    </div>
  );
}

export default CourseProgress;