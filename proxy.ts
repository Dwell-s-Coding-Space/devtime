import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PUBLIC_ROUTES, ROUTES } from './src/shared/constants/routes';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // public route skip
  if (PUBLIC_ROUTES.some(route => pathname.startsWith(route))) return NextResponse.next();

  // api route, static file skip
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // protected route
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
