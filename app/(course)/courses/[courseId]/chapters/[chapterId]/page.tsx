import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import { getChapter } from "@/actions/get-chapter";

import Banner from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import CourseProgressButton from "./_components/course-progress-button";
import AttachmentLink from "./_components/attachment-link";


const ChapterIdPage = async ({ params }: { params: { courseId: string, chapterId: string } }): Promise<JSX.Element> => {
  const { courseId, chapterId } = params;

  const { userId } = auth();
  if (!userId) return redirect("/");

  const {
    chapter, course, muxData, attachments, nextChapter, userProgress, purchase,
  } = await getChapter({ userId, courseId, chapterId });

  if (!chapter || !course) return redirect("/");

  const isLocked = !chapter.isFree && !purchase;

  const completeOnEnd = !!purchase && !userProgress?.isCompleted // && !nextChapter;

  return (
    <div className="">
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="Chapter completed."
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="Purchase this course to continue watching."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapterId}
            title={chapter.title}
            courseId={courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between p-4">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase
              ? (
              <CourseProgressButton 
                courseId={courseId}
                chapterId={chapterId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
              )
              : (<CourseEnrollButton courseId={courseId} price={course.price!} />)
            }
          </div>
          <Separator />
          <div className="">
            <Preview value={chapter.description!} />
          </div>
          {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map(attachment => (
                  <AttachmentLink key={attachment.id} attachment={attachment} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterIdPage;