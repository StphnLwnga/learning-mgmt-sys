import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Updates a chapter in the database.
 *
 * @param {Request} req - The HTTP request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.courseId - The ID of the course.
 * @param {string} params.chapterId - The ID of the chapter.
 * @return {Promise<NextResponse>} The updated chapter.
 */
export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }): Promise<NextResponse> {
  const { courseId, chapterId } = params;

  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId },
    });
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const { isPublished, ...values } = await req.json();

    const chapter = await db.chapter.update({
      where: { id: chapterId, courseId },
      data: { ...values, },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log('[CHAPTER_TITLE_API]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}