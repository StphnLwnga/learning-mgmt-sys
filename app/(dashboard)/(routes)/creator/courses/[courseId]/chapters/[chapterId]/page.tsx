import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { cn } from "@/lib/utils";
import IconBadge from "@/components/icon-badge";
import Banner from "@/components/banner";
import {
  ChapterAccessForm,
  ChapterActions,
  ChapterDescriptionForm,
  ChapterTitleForm,
  ChapterVideoForm
} from "./_components";


interface ChapterIdPageProps {
  params: {
    courseId: string;
    chapterId: string;
  }
}

/**
 * Retrieves the ChapterIdPage component.
 *
 * @param {ChapterIdPageProps} params - The parameters for the component.
 * @return {Promise<JSX.Element>} A Promise that resolves to the ChapterIdPage component.
 */
const ChapterIdPage = async ({ params }: ChapterIdPageProps): Promise<JSX.Element> => {
  const { userId } = auth();
  if (!userId) return redirect('/');

  const { chapterId, courseId } = params;

  const chapter = await db.chapter.findUnique({
    where: { id: chapterId, courseId, },
    include: { muxData: true, },
  });
  if (!chapter) return redirect('/');

  const requiredFields = [
    chapter.title, chapter.description, chapter.videoUrl,
  ];

  const totalField = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalField})`;

  const isChapterComplete = requiredFields.every(Boolean);

  return (
    <>
      <Banner
        variant={chapter.isPublished ? "success" : "warning"}
        label={chapter.isPublished
          ? "Chapter published. It is now visible in the course."
          : "Chapter not published. It will not be visible in the course."
        }
      />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/creator/courses/${courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Chapter Creation
                </h1>
                <span className={cn("text-sm text-slate-600")}>
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                initialData={chapter}
                courseId={courseId}
                disabled={!isChapterComplete}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Chapter Details
                </h2>
              </div>
              <ChapterTitleForm initialData={chapter} courseId={courseId} />
              <ChapterDescriptionForm initialData={chapter} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Access Settings</h2>
              </div>
              <ChapterAccessForm initialData={chapter} courseId={courseId} chapterId={chapterId} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Chapter Video</h2>
            </div>
            <ChapterVideoForm initialData={chapter} chapterId={chapterId} courseId={courseId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChapterIdPage;