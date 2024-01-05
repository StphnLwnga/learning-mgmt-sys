import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Updates a course in the database.
 *
 * @param {Request} req - the request object
 * @param {Object} params - an object containing the parameters
 *   @param {string} params.courseId - the ID of the course to update
 * @return {Promise<NextResponse>} a Promise that resolves to a NextResponse object
 */
export async function PATCH(req: Request, { params }: { params: { courseId: string } }): Promise<NextResponse> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId } = params;
    const data = await req.json();

    const course = await db.course.update({
      where: { id: courseId, userId },
      data: { ...data },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSEIDAPI]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}