import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { isInstructor } from "@/lib/instructor";

/**
 * Sends a POST request to create a new course.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { userId } = auth();

    const { title } = await req.json();

    const isAuthorized = isInstructor(userId);

    if (!userId || !isAuthorized) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.create({
      data: { userId, title, }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * Retrieves the courses associated with the authenticated user.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object containing the courses as JSON.
 */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courses = await db.course.findMany({
      where: { userId, },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}