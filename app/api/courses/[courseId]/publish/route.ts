import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


/**
 * Updates the course to be published based on the courseId provided.
 *
 * @param {Request} req - The request object.
 * @param {{ params: { courseId: string } }} - The parameters object containing the courseId.
 * @return {Promise<NextResponse>} - A promise that resolves to the NextResponse object.
 */
export async function PATCH(req: Request, { params }: { params: { courseId: string } }): Promise<NextResponse> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId } = params;

    const course = await db.course.findFirst({
      where: { id: courseId, userId },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) return new NextResponse("Unauthorized", { status: 401 });

    // Make sure course to be published has atleast 1 published chapter
    const hasPubChapters = course.chapters.some((chapter: { isPublished: boolean; }) => chapter.isPublished);

    // Return if missing a required field or no published chapters
    if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPubChapters)
      return new NextResponse("Missing required fields", { status: 401 });

    // Update course to be published
    const publishedCourse = await db.course.update({
      where: { id: courseId },
      data: { isPublished: true, }
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.error("[COURSE_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}