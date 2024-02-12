import { NextMiddleware } from "next/server";
import { authMiddleware } from "@clerk/nextjs";

import { MiddlewareFactory } from "./types";

/**
 * This example protects all routes including api/trpc routes
 * Please edit this to allow other routes to be public as needed.
 * See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
 *
 * @param {MiddlewareFactory} _next - The next middleware in the chain
 * @return {Middleware} The authentication middleware
 */
export const withAuth: MiddlewareFactory = (_next: NextMiddleware): NextMiddleware => {
  return authMiddleware({
    publicRoutes: ["/api/webhook", '/api/uploadthing'],
  });
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};