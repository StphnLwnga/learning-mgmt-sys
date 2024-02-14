
"use client"

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from 'next-themes';
import { Check, ChevronRight, Lock, PlayCircle } from "lucide-react";
import { FaCircleRight } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Locale } from "@/i18n";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  courseId: string;
  isCompleted: boolean;
  isLocked: boolean;
  lang: Locale;
}

const CourseSidebarItem = ({ id, label, courseId, isCompleted, isLocked, lang }: CourseSidebarItemProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const { resolvedTheme } = useTheme();

  const Icon = isLocked ? Lock : (isCompleted ? Check : PlayCircle);

  const isActive = pathname?.includes(id);

  const onClick = (): void => router.push(`/${lang}/courses/${courseId}/chapters/${id}`);

  return (
    <button type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/30",
        isActive && "text-slate-700 bg-slate-200/20 hover:text-slate-700 hover:bg-slate-200/20",
        resolvedTheme === 'dark' && "text-slate-500 hover:bg-slate-700/20 hover:text-slate-400",
        isCompleted && "text-emerald-500 hover:text-emerald:700",
        isActive && isCompleted && "bg-emerald-200/20",
        isActive && resolvedTheme === 'dark' && "text-slate-200 hover:text-slate-300 bg-sky-300/30 hover:bg-sky-300/30",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            resolvedTheme === 'dark' && "text-slate-400 hover:bg-slate-700/20 hover:text-slate-300",
            isCompleted && "text-emerald-700",
            isActive && resolvedTheme === 'dark' && "text-slate-200 hover:text-slate-100 ",
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isActive && resolvedTheme === 'dark' && "border-slate-200",
          isCompleted && "border-emerald-700",
        )}
      />
    </button>
  );
}

export default CourseSidebarItem;