import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (!request.cookies.get('guestId')) {
    // TODO: replace with generateUUID when token auth implemented
    const guestId = Math.floor(10000000000 + Math.random() * 90000000000).toString()

    response.cookies.set('guestId', guestId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }

  return response
}

export const config = {
  matcher: '/:path*',
}
