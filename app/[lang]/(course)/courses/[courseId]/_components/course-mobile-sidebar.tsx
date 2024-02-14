import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CourseNavbarProps } from "./course-navbar";
import CourseSidebar from "./course-sidebar";

const CourseMobileSidebar = ({ course, progressCount, t, lang }: CourseNavbarProps): JSX.Element => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition z-60">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar
          t={t}
          lang={lang}
          course={course}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  );
}

export default CourseMobileSidebar;