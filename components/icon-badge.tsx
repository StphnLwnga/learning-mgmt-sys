import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-sky-100",
        success: "bg-emerald-100",
        ghostLight: "bg-none",
        ghostDark: "bg-none",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-sky-700",
        success: "text-emerald-700",
        ghostLight: "text-sky-700",
        ghostDark: "text-slate-200",
      },
      size: {
        default: "h-6 w-6",
        sm: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type BackgroundVariantProps = VariantProps<typeof backgroundVariants>;
type IconVariantProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantProps, IconVariantProps {
  icon: LucideIcon | IconType;
}

const IconBadge = ({
  icon: Icon,
  variant,
  size,
}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
}

export default IconBadge;