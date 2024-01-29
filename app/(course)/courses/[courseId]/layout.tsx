import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
  }
}

/**
 * Renders the layout for the course page.
 *
 * @param {CourseLayoutProps} children - The children components to be rendered.
 * @param {CourseLayoutProps} params - The parameters for the course layout.
 * @return {Promise<JSX.Element>} The layout of the course page as a JSX element.
 */
const CourseLayout = async ({ children, params }: CourseLayoutProps): Promise<JSX.Element> => {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const { courseId } = params;

  try {
    const course = await db.course.findUnique({
      where: { id: courseId, },
      include: {
        chapters: {
          where: { isPublished: true, },
          include: { userProgress: { where: { userId, } }, },
          orderBy: { position: 'asc', }
        },
      },
    });

    if (!course) return redirect("/");

    const progressCount = await getProgress(userId, courseId);

    return (
      <div className="h-full">
        <div className="h-[80px] md:80-pl fixed inset-y-0 w-full z-55">
          <CourseNavbar course={course} progressCount={progressCount} />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar course={course} progressCount={progressCount} />
        </div>
        <main className="md:pl-80 pt-[80px] h-full">
          {children}
        </main>
      </div>
    );
  } catch (error) {
    console.log("Failed to fetch course", error);
    return redirect("/");
  }
}

export default CourseLayout;