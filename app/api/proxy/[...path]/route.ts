import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_BASE_URL;

async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;

  console.log(`[Proxy Debug] BACKEND_URL=${BACKEND_URL}, path=${path.join('/')}`);

  if (!BACKEND_URL) {
    console.error('[Proxy Debug] API_BASE_URL is not set!');
    return NextResponse.json({ error: 'API_BASE_URL is not configured' }, { status: 500 });
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const url = new URL(request.url);
  const target = new URL(`${BACKEND_URL}/${path.join('/')}`);
  target.search = url.search;

  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.delete('host');
  forwardHeaders.delete('cookie');

  if (accessToken) forwardHeaders.set('authorization', `Bearer ${accessToken}`);

  const hasBody = !['GET', 'HEAD'].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  const forward = (token?: string) => {
    const headers = new Headers(forwardHeaders);
    if (token) headers.set('authorization', `Bearer ${token}`);
    else headers.delete('authorization');

    return fetch(target, {
      method: request.method,
      headers,
      body,
      duplex: 'half',
    } as RequestInit);
  };

  let upstream = await forward(accessToken);

  if (upstream.status !== 401) {
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: upstream.headers,
    });
  }

  if (!refreshToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const refreshResponse = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  } as RequestInit);

  if (!refreshResponse.ok) {
    const res = NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');
    return res;
  }

  const refreshData = await refreshResponse.json();

  upstream = await forward(refreshData.accessToken);

  const newRes = new NextResponse(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });

  newRes.cookies.set('accessToken', refreshData.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    // maxAge는 백엔드 만료에 맞춰 설정 권장
  });

  return newRes;
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
