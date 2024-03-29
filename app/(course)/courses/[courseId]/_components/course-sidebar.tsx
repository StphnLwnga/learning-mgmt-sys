import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Chapter, Course, UserProgress } from "@prisma/client";
import { db } from "@/lib/db";
import CourseSidebarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps): Promise<JSX.Element> => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: { userId, courseId: course.id },
    },
  });

  try {
    return (
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="pt-8 pb-6 px-8 flex flex-col border-b">
          <h1 className="font-semibold">
            {course.title}
          </h1>
          {purchase && (
            <div className="mt-10">
              <CourseProgress value={progressCount} variant="success" color="success" />
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          {course.chapters.map(chapter => (
            <CourseSidebarItem key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              courseId={course.id}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              isLocked={!chapter.isFree && !purchase}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log("Failed to fetch purchase", error);
    return redirect('/');
  }
}

export default CourseSidebar;