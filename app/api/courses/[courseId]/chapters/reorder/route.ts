import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Updates the position of chapters in a course.
 *
 * @param {Request} req - the HTTP request object
 * @param {{params: {courseId: string}}} - an object containing the courseId parameter
 * @returns {Promise<NextResponse>} - a promise that resolves to a NextResponse object
 */
export async function PATCH(req: Request, { params }: { params: { courseId: string } }): Promise<NextResponse> {
  const { courseId } = params;

  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: { id: courseId, userId, },
    });
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const { list } = await req.json();

    for (let item of list)
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },  
      });

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[CHAPTERS_REORDER_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}