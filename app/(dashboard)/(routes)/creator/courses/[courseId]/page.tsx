import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import IconBadge from "@/components/icon-badge";
import { CircleDollarSign, File, LayoutDashboard, ListChecks, Upload } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";

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
    where: { id: courseId, },
    include: {
      // category: true,
      attachments: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!course) return redirect('/');

  const categories = await db.category.findMany({
    orderBy: { name: 'asc', },
  });

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
          <TitleForm initialData={course} courseId={course.id} userId={userId} />
          <DescriptionForm initialData={course} courseId={course.id} userId={userId} />
          <ImageForm initialData={course} courseId={course.id} userId={userId} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({ label: category.name, value: category.id }))}
            userId={userId}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">
                Course Chapters
              </h2>
            </div>
            <div>
              TODO: Chapters
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">
                Sell your course
              </h2>
            </div>
            <PriceForm initialData={course} courseId={course.id} userId={userId} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">
                Resources & Attachments
              </h2>
            </div>
            <AttachmentForm initialData={course} courseId={course.id} userId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseIdPage;