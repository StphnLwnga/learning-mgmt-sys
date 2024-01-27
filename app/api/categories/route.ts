import { db } from "@/lib/db";
import { NextResponse } from "next/server";

/**
 * Asynchronous function to handle GET requests.
 *
 * @param {Request} req - The request object
 * @return {Promise<NextResponse>} A promise that resolves to the NextResponse
 */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const categories = await db.category.findMany({
      include: { courses: true, },
      orderBy: [
        { courses: { _count: 'desc', }, },
        { name: 'asc', },
      ],
    });
    
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}