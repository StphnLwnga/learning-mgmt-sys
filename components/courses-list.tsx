"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { CoursesWithProgressWithCategory } from "@/actions/get-courses";

import CourseCard from "./course-card";
import { CoursesListSkeleton } from "./skeletons";

interface CoursesListProps {
  items: CoursesWithProgressWithCategory[];
}

const CoursesList = ({ items }: CoursesListProps): JSX.Element => {
  const { theme } = useTheme();

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    setIsDarkTheme(theme === "dark" ?? false);
  }, [theme]);

  return (
    <div className="">
      {items.length > 0
        ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map(course => (
              <CourseCard key={course.id}
                id={course.id}
                title={course.title}
                imageUrl={course.imageUrl!}
                chaptersLength={course.chapters.length}
                price={course.price!}
                progress={course.progress}
                category={course?.category?.name!}
              />
            ))}
          </div>
        )
        : (<CoursesListSkeleton />)
      }
    </div>

  );
}

export default CoursesList;