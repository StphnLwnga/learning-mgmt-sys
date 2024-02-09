import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";
import { NextResponse } from "next/server";

type PurchaseWithCourse = Purchase & {
  course: Course;
}

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach(purchase => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) grouped[courseTitle] = 0;
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
}

/**
 * Fetches analytics data for a specific user.
 *
 * @param {string} userId - The unique identifier of the user.
 * @return {Promise<object>} An object containing analytics data.
 */
export async function getAnalytics(userId: string) {
  try {
    const purchases = await db.purchase.findMany({
      where: {
        course: {
          userId,   // Get courses created by this user.
        },
      },
      include: {
        course: true,
      },
    });

    const groupedEarnings = groupByCourse(purchases);
    const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
      name: courseTitle, total,
    }));
    const totalRevenue = data.reduce((a, b) => a + b.total, 0);
    const totalSales = purchases.length;

    return { data, totalRevenue, totalSales, }
  } catch (error) {
    console.log("[ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
}