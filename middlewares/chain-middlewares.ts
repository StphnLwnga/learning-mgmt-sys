import { NextMiddleware, NextResponse } from "next/server";

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

/**
 * Chains multiple middleware functions together.
 *
 * @param {MiddlewareFactory[]} fns - An array of middleware functions to be chained
 * @param {number} index - The current index in the array (default is 0)
 * @return {NextMiddleware} The composed middleware function
 */
export function chainMiddlewares(fns: MiddlewareFactory[], index: number = 0): NextMiddleware {
  const current = fns[index];

  if (current) {
    const next = chainMiddlewares(fns, index + 1);
    return current(next);
  }

  return () => NextResponse.next();
}