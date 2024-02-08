import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * Handles the POST request for creating a checkout session for a course purchase.
 *
 * @param {Request} req - the request object
 * @param {Object} params - an object containing the courseId parameter
 * @return {Promise<NextResponse>} a NextResponse promise representing the result of the checkout session creation
 */
export async function POST(req: Request, { params }: { params: { courseId: string } }): Promise<NextResponse> {
  try {
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress)
      return new NextResponse("Unauthorized", { status: 401 });

    const { courseId } = params;
    const course = await db.course.findUnique({
      where: {
        id: courseId, isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user.id, courseId,
        },
      },
    });

    switch (true) {
      case !course:
        return new NextResponse("Not Found", { status: 404 });
      case !!purchase:
        return new NextResponse("Already Purchased", { status: 400 });
      default:
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
          {
            quantity: 1,
            price_data: {
              currency: "USD",
              product_data: {
                name: course.title,
                description: course.description!,
              },
              unit_amount: Math.round(course.price! * 100),
            },
          },
        ];
    
        console.log(line_items);
    
        let stripeCustomer = await db.stripeCustomer.findUnique({
          where: { userId: user.id, },
          select: { stripeCustomerId: true, },
        });
    
        if (!stripeCustomer) {
          const customer = await stripe.customers.create({
            email: user.emailAddresses?.[0]?.emailAddress,
          });
    
          stripeCustomer = await db.stripeCustomer.create({
            data: {
              userId: user.id,
              stripeCustomerId: customer.id,
            },
          });
        }
    
        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items,
          customer: stripeCustomer.stripeCustomerId,
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?success=1`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${courseId}?canceled=1`,
          metadata: {
            courseId,
            userId: user.id,
          },
        });
    
        return NextResponse.json({ url: session.url });
    }  
  } catch (error) {
    console.log("[CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}