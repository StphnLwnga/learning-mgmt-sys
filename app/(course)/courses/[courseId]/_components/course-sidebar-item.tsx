
"use client"

import { usePathname, useRouter } from "next/navigation";
import { Check, ChevronRight, Lock, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaCircleRight } from "react-icons/fa6";

interface CourseSidebarItemProps {
  id: string;
  label: string;
  courseId: string;
  isCompleted: boolean;
  isLocked: boolean;
}

const CourseSidebarItem = ({ id, label, courseId, isCompleted, isLocked }: CourseSidebarItemProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : (isCompleted ? Check : PlayCircle);

  const isActive = pathname?.includes(id);

  const onClick = (): void => router.push(`/courses/${courseId}/chapters/${id}`);

  return (
    <button type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/30",
        isActive && "text-slate-700 bg-slate-200/20 hover:text-slate-700 hover:bg-slate-200/20",
        isCompleted && "text-emerald-500 hover:text-emerald:700",
        isActive && isCompleted && "bg-emerald-200/20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700",
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
          isActive && "opacity-100",
          isCompleted && "border-emerald-700",
        )}
      />
    </button>
  );
}

export default CourseSidebarItem;