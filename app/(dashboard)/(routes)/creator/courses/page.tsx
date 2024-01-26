"use client"

import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';

import { useCoursesData } from "@/lib/hooks";

import { DataTable, columns } from "./_components";


const CoursesPage = (): JSX.Element => {
  const { courses } = useCoursesData();

  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]); 

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} isDarkTheme={isDarkTheme} />
    </div>
  );
}

export default CoursesPage;