"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";

import { useCoursesData } from "@/lib/hooks";
import { Skeleton } from "@/components/ui/skeleton"
import { DataTable, columns } from "./_components";


/**
 * Renders the CoursesPage component.
 *
 * @return {JSX.Element} The rendered component.
 */
const CoursesPage = (): JSX.Element => {
  const { courses } = useCoursesData();

  return (
    <div className="p-6">
      {courses
        ? <DataTable columns={columns} data={courses} />
        : <Skeleton className="w-full h-[80vh] rounded" />
      }

      {/* <Link href='/creator/create'>
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
      </Link> */}
    </div>
  );
}

export default CoursesPage;