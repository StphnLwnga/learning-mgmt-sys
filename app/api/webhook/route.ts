import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

/**
 * Function to handle POST request for processing Stripe webhook events.
 *
 * @param {Request} req - the incoming request object
 * @return {Promise<NextResponse>} the response object
 * 
 * Excessive 400 errors will trigger Stripe to block requests
 */
export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.text();

  const signature = headers().get("Stripe-Signature") as string; // Get the Stripe-Signature header

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body, signature, process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    console.log("[WEBHOOK_ERROR]", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const [userId, courseId] = [session?.metadata?.userId, session?.metadata?.courseId];

  switch (true) {
    case event.type === "checkout.session.completed":
      if (!userId || !courseId) return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });

      await db.purchase.create({
        data: { userId, courseId, },
      });

      return new NextResponse(null, { status: 200 });
      
    default:
      return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 });
  }
}