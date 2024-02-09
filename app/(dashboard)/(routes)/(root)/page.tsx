import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import CoursesList from "@/components/courses-list";

export default async function Dashboard(): Promise<JSX.Element> {
  const { userId } = auth();
  if (!userId) return redirect('/');

  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

  const items = [...coursesInProgress, ...completedCourses];

  console.log({items})

  return (
    <div className="h-full p-6 space-y-4">
      <div className="grid grid-cols sm:grid-cols-2 gap-4">
        <div className="">
          {/** @todo: Info card */}
        </div>
        <div className="">
          {/** @todo: Info card */}
        </div>
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  )
}
