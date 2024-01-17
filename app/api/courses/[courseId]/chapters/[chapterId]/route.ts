import Mux from "@mux/mux-node";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

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

    if (values.videoUrl) {
      // Delete existing video if it exists from Mux and the associated data from the database
      const existingMuxData = await db.muxData.findFirst({ where: { chapterId, }, });
      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({ where: { chapterId, }, });
        // await db.muxData.delete({ where: { id: existingMuxData.id } });
      }

      // Add video data to Mux
      const asset = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      // Add Mux data to database
      await db.muxData.create({
        data: {
          chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        }
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log('[CHAPTER_EDIT_API]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/**
 * Delete a chapter from a course.
 *
 * @param {Request} req - the request object
 * @param {Object} params - the parameters object
 * @param {string} params.courseId - the ID of the course
 * @param {string} params.chapterId - the ID of the chapter
 * @return {Promise<NextResponse>} a promise that resolves to a NextResponse object
 */
export async function DELETE(req: Request, { params }: { params: { courseId: string; chapterId: string } }): Promise<NextResponse> {
  const { courseId, chapterId } = params;

  try {
    // Check if user authorized
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    // Check if user owns course
    const ownCourse = await db.course.findUnique({ where: { id: courseId, userId }, });
    if (!ownCourse) return new NextResponse("Unauthorized", { status: 401 });

    // Find chapter in database, return 404 if non-existent
    const chapter = await db.chapter.findUnique({ where: { id: chapterId, courseId, }, });
    if (!chapter) return new NextResponse("Chapter not found", { status: 404 });

    // Check if chapter has Mux data and delete from Mux & databse
    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({ where: { chapterId, }, });
      if (existingMuxData) {
        await Video.Assets.del(existingMuxData.assetId);
        await db.muxData.delete({ where: { chapterId, }, });
      }
    }

    // Delete chapter from database
    const deletedChapter = await db.chapter.delete({ where: { id: chapterId, courseId, }, });

    // Course needs 1 chapter to be considered published. Unpublish whole course if not the case
    const pubChaptersInCourse = await db.chapter.findMany({ where: { courseId, isPublished: true }, },);
    if (!pubChaptersInCourse || pubChaptersInCourse.length === 0) {
      await db.course.update({
        where: { id: courseId, userId },
        data: { isPublished: false, },
      });
    };

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.error("[DELETE_CHAPTER_API]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
