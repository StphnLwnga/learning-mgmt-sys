import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const categories = await db.category.findMany({
      orderBy: { name: 'asc', },
      include: { courses: true, },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}