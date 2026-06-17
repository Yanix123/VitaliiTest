import { type NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

import { ERoute } from '@/app/shared/interfaces'

// proxy — optimistic gate for /favorites (real session check lives in the page)
export function proxy(req: NextRequest) {
  const sessionCookie = getSessionCookie(req)

  if (!sessionCookie) {
    const loginUrl = new URL(ERoute.LOGIN, req.url)
    const returnTo = req.nextUrl.pathname + req.nextUrl.search
    loginUrl.searchParams.set('returnTo', returnTo)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/favorites/:path*'],
}
