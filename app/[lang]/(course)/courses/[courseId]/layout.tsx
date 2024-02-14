import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Course } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: {
    courseId: string;
    lang: Locale;
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
  const { lang, courseId } = params;

  const { userId } = auth();
  if (!userId) return redirect(`/${lang}`);

  const t = await getDictionary(lang);

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

    if (!course) return redirect(`/${lang}`);

    const progressCount = await getProgress(userId, courseId);

    return (
      <div className="h-full">
        <div className="h-[80px] md:80-pl fixed inset-y-0 w-full z-55">
          <CourseNavbar
            t={t}
            lang={lang}
            course={course}
            progressCount={progressCount}
          />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <CourseSidebar
            t={t}
            lang={lang}
            course={course}
            progressCount={progressCount}
          />
        </div>
        <main className="md:pl-80 pt-[80px] h-full">
          {children}
        </main>
      </div>
    );
  } catch (error) {
    console.log("Failed to fetch course", error);
    return redirect(`/${lang}`);
  }
}

export default CourseLayout;