import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { GUEST_ONLY_ROUTES, PUBLIC_ROUTES, ROUTES } from './src/shared/constants/routes';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // root redirect
  if (pathname === '/') {
    const homeUrl = new URL(ROUTES.HOME, request.url);
    return NextResponse.redirect(homeUrl);
  }

  // public route skip
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) return NextResponse.next();

  // api route, static file skip
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;

  // guest only route
  if (GUEST_ONLY_ROUTES.some(route => pathname.startsWith(route))) {
    if (accessToken) {
      const homeUrl = new URL(ROUTES.HOME, request.url);
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  }

  // protected route
  if (!accessToken) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
