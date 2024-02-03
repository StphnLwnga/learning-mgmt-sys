import { db } from "@/lib/db";
import { Attachment, Chapter, Course, UserProgress, MuxData, Purchase, } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

/**
 * Retrieves a chapter, course, muxData, attachments, next chapter, user progress, and purchase information based on the provided user, course, and chapter IDs. 
 *
 * @param {GetChapterProps} userId - The user ID
 * @param {GetChapterProps} courseId - The course ID
 * @param {GetChapterProps} chapterId - The chapter ID
 * @return {Promise<obj>} The retrieved chapter, course, muxData, attachments, next chapter, user progress, and purchase information
 */
export const getChapter = async ({ userId, courseId, chapterId }: GetChapterProps) => {
  try {
    // find if user made purchase
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId, courseId,
        },
      },
    });

    // get course price
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: { price: true, },
    });

    // get chapter
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) throw new Error("Chapter or course not found");

    // get muxData, attachments & nextChapter only if purchase is made
    let [muxData, attachments, nextChapter,]: [MuxData | null, Attachment[], Chapter | null,] = [null, [], null,];

    if (purchase)
      attachments = await db.attachment.findMany({ where: { courseId }, });

    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({ where: { chapterId }, });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: { gt: chapter?.position, },
        },
        orderBy: { position: "asc", },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: { userId, chapterId, },
      },
    });

    return {
      chapter, course, muxData, attachments, nextChapter, userProgress, purchase,
    };
  } catch (error) {
    console.error('[GET_CHAPTER]', error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
}