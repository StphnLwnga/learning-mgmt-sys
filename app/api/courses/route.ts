import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/**
 * Sends a POST request to create a new course.
 *
 * @param {Request} req - The request object.
 * @return {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const course = await db.course.create({
      data: { userId, title, }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}