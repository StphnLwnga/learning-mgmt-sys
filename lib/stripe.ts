import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
  appInfo: {
    name: "CLM SYS",
    version: "1.0.0",
  }
});