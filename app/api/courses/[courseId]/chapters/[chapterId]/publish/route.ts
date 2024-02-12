import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Updates the specified chapter to be published for a given course.
 *
 * @param {Request} req - the request object
 * @param {{ params: { courseId: string; chapterId: string } }} - an object containing the courseId and chapterId
 * @return {Promise<NextResponse>} - a promise that resolves to a NextResponse object
 */
export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }): Promise<NextResponse> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId, chapterId } = params;

    const ownCourse = await db.course.findUnique({
      where: { id: courseId, userId },
    });
    if (!ownCourse) return new NextResponse("Unauthorized", { status: 401 });

    const chapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { isPublished: true },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};