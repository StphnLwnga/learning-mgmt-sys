import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"


/**
 * PATCH function for updating a course's publish status.
 *
 * @param {Request} req - the HTTP request object
 * @param {Object} params - an object containing the course ID
 * @param {string} params.courseId - the ID of the course to be updated
 * @return {Promise<NextResponse>} a promise that resolves to a NextResponse object
 */
export async function PATCH(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId } = params;

    const course = await db.course.findUnique({ where: { id: courseId, userId }, });
    if (!course) return new NextResponse("Unauthorized", { status: 401 });

    const unPublishedCourse = await db.course.update({
      where: { id: courseId, userId, },
      data: { isPublished: false, }
    });

    return NextResponse.json(unPublishedCourse);
  } catch (error) {
    console.error("[COURSE_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}