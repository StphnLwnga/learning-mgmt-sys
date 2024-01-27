import { db } from "@/lib/db";

/**
 * Retrieves the progress percentage for a user in a specific course.
 *
 * @param {string} userId - The ID of the user
 * @param {string} courseId - The ID of the course
 * @return {Promise<number>} The progress percentage
 */
export const getProgress = async (userId: string, courseId: string): Promise<number> => {
  try {
    if (!userId || !courseId) return 0;

    const publishedChapters = await db.chapter.findMany({
      where: { courseId, isPublished: true, },
      select: { id: true, },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}