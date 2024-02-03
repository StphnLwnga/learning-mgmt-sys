import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getChapter } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import VideoPlayer from "./_components/video-player";

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
          label="Course completed."
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
      </div>
    </div>
  );
}

export default ChapterIdPage;