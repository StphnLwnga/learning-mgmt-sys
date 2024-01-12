import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { courseId: string; chapterId: string } }): Promise<NextResponse> {
  const { courseId, chapterId } = params;

  try {
    const {userId} = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId, userId
      }
    });
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const { title } = await req.json();

    const chapter = await db.chapter.update({
      where: {
        id: chapterId, courseId
      },
      data: {
        title
      },
      select: {
        id: true, title: true
      }
    });

    return NextResponse.json(chapter);
  } catch (error) {
    console.log('[CHAPTER_TITLE_API]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}