"use client"

import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircleIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import {useTheme} from 'next-themes';

import { cn } from '@/lib/utils';

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: `border-yellow-300 text-primary bg-yellow-300/75`,
        success: `bg-emerald-700, border-emerald-400 bg-emerald-500/75 text-primary`,
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
};

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
}

export default Banner;