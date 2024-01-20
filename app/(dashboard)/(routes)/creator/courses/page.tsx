"use client"

import { useCoursesData } from "@/lib/hooks";
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
      <DataTable columns={columns} data={courses} />
    </div>
  );
}

export default CoursesPage;