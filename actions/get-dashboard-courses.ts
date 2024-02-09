import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithCategoryWithProgress = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
}
type DashboardCourses = {
  completedCourses: CourseWithCategoryWithProgress[];
  coursesInProgress: CourseWithCategoryWithProgress[];
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
  const [completedCourses, coursesInProgress]: [CourseWithCategoryWithProgress[], CourseWithCategoryWithProgress[]]  = [[], []];

    const purchasedCourses = await db.purchase.findMany({
      where: { userId, },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: { isPublished: true, },
            },
          },
        },
      },
    });

    const courses = purchasedCourses.map(purchase => purchase.course as CourseWithCategoryWithProgress);
    
    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course.progress = progress;
      switch (true) {
        case progress === 100:
          completedCourses.push(course);
          break;
      
        default:
          coursesInProgress.push(course);
          break;
      }
    }

    return { completedCourses, coursesInProgress }
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [], coursesInProgress: [],
    };
  }
}