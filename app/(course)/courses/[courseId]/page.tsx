import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CourseIdPage = async ({ params }: { params: { courseId: string; } }): Promise<JSX.Element> => {
  const { courseId } = params;

  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        orderBy: { position: 'asc', },
      },
    },
  });

  if (!course) return redirect("/");

  return redirect(`/courses/${course.id}/chapters/${course.chapters[0].id}`);
}

export default CourseIdPage;