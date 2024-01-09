import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST( req: Request, { params }: { params: { courseId: string } }): Promise<NextResponse> {
  const { courseId } = params;
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });
    if (!courseOwner) return new NextResponse("Unauthorized", { status: 401 });

    const { url } = await req.json();

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[ATTACHMENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}