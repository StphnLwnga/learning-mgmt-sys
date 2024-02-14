import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Locale } from "@/i18n";

const CourseIdPage = async ({ params }: { params: { courseId: string; lang: Locale } }): Promise<JSX.Element> => {
  const { courseId, lang } = params;

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        orderBy: { position: 'asc', },
      },
    },
  });

  if (!course) return redirect(`/${lang}`);

  return redirect(`/${lang}/courses/${course.id}/chapters/${course.chapters[0].id}`);
}

export default CourseIdPage;