import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import IconBadge from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";


/**
 * Renders the CourseIdPage component.
 *
 * @param {Object} params - An object containing the courseId parameter.
 * @param {string} params.courseId - The ID of the course.
 * @return {Promise<JSX.Element>} The JSX Element representing the CourseIdPage component.
 */
const CourseIdPage = async ({ params }: { params: { courseId: string } }): Promise<JSX.Element> => {
  const { userId } = auth();

  if (!userId) return redirect('/');

  const { courseId } = params;

  const course = await db.course.findUnique({
    where: { id: courseId, }
  });

  if (!course) return redirect('/');

  const requiredFields = [
    course.title, course.description, course.imageUrl, course.price, course.categoryId,
  ];

  const totalField = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalField})`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-mediu">
            Course Setup
          </h1>
          <span className={cn(
            "text-sm",
            completedFields === totalField ? "opacity-100" : "opacity-50",

          )}>
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">
              Customize your course
            </h2>
          </div>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          {/* <TotalPriceForm initialData={{ price: course.price || undefined }} courseId={course.id} /> */}
        </div>
      </div>
    </div>
  );
}

export default CourseIdPage;