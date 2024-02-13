import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { MiddlewareFactory } from './types'

import { i18n } from '@/i18n'

/**
 * Retrieves the locale based on the request object using content negotiation.
 *
 * @param {NextRequest} request - the request object
 * @return {string | undefined} the retrieved locale
 */
function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}


/**
 * A middleware that checks for supported locale in the pathname and redirects if there is no locale.
 *
 * @param {NextMiddleware} next - The next middleware function in the chain
 * @return {Promise<void>} A promise representing the completion of the middleware operation
 */
export const withLang: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
      // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl

    console.log("pathname", pathname)

    let {locales} = i18n

    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. If incoming request is /search, the new URL is now /en/search
    return Response.redirect(request.nextUrl);
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}