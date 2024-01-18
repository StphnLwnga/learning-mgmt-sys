import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";


const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

/**
 * Updates a course in the database.
 *
 * @param {Request} req - the request object
 * @param {Object} params - an object containing the parameters
 * @param {string} params.courseId - the ID of the course to update
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

/**
 * Deletes a course and its associated chapters and Mux data.
 *
 * @param {Request} req - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.courseId - The ID of the course to delete.
 * @return {Promise<NextResponse>} A Promise that resolves to a NextResponse object.
 */
export async function DELETE(req: Request, { params }: { params: { courseId: string } }): Promise<NextResponse> {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { courseId } = params;

    // get associated chapters & muxData
    const course = await db.course.findUnique({
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

    // Delete associated Mux data / assets
    for (const chapter of course.chapters) {
      if (chapter.muxData) {
        await Video.Assets.del(chapter.muxData.assetId);
        await db.muxData.delete({ where: { id: chapter.muxData.id } });
      }
    }

    // Delete course
    const deletedCourse = await db.course.delete({
      where: { id: courseId, userId },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSEIDAPI]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};