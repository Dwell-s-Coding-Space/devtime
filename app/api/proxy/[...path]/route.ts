import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_BASE_URL;

async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const url = new URL(request.url);
  const target = new URL(`${BACKEND_URL}/${path.join('/')}`);
  target.search = url.search;

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('cookie');

  if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);

  const hasBody = !['GET', 'HEAD'].includes(request.method);
  const body = hasBody ? await request.text() : undefined;

  const response = await fetch(target, {
    method: request.method,
    headers,
    body,
    duplex: 'half',
  } as RequestInit);

  return new NextResponse(response.body, {
    status: response.status,
    headers: response.headers,
  });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
