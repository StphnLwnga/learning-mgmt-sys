import NavbarRoutes from "@/components/navbar-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import CourseMobileSidebar from "./course-mobile-sidebar";
import { Locale } from "@/i18n";

export interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[];
  };
  progressCount: number;
  lang: Locale;
  t: Record<string, any>
}

const CourseNavbar = ({ course, progressCount, t, lang }: CourseNavbarProps): JSX.Element => {
  return (
    <div className="p-4 border-b h-full items-center bg-transparent shadow-sm flex justify-end">
      <CourseMobileSidebar course={course} progressCount={progressCount}  t={t} lang={lang} />
      <NavbarRoutes t={t} lang={lang} />
    </div>
  );
}
 
export default CourseNavbar;