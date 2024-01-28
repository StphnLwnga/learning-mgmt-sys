import { Category, Course } from "@prisma/client";
import { db } from "@/lib/db";

import { getProgress } from "./get-progress";

export type CoursesWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

/**
 * Retrieves courses based on the provided filters and includes category, chapters, and purchases.
 *
 * @param {GetCourses} userId - The user ID for filtering courses.
 * @param {GetCourses} title - The title for filtering courses.
 * @param {GetCourses} categoryId - The category ID for filtering courses.
 * @return {Promise<CoursesWithProgressWithCategory[]>} A promise that resolves to an array of courses with progress and category information.
 */
export const getCourses = async ({ userId, title, categoryId }: GetCourses): Promise<CoursesWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: { contains: title, },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: { isPublished: true, },
          select: { id: true, },
        },
        purchases: {
          where: { userId },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const coursesWithProgress: CoursesWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        if (course.purchases.length === 0) 
          return { ...course, progress: null };

        const progress = await getProgress(userId, course.id);

        return { ...course, progress };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSE]", error);
    return [];
  }
}