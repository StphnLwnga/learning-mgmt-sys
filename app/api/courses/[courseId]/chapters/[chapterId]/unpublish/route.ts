import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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
      data: { isPublished: false },
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};