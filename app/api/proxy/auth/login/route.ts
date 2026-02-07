import { NextRequest, NextResponse } from 'next/server';
import { PostLoginResponse } from '@/src/features/auth/auth.schema';
import { setTokens } from '@/src/features/auth/auth.utils';
import { API_ENDPOINTS } from '@/src/shared/constants/apiEndpoints';
import { BACKEND_URL } from '@/src/shared/constants/env';

export async function POST(request: NextRequest) {
  const target = new URL(`${BACKEND_URL}${API_ENDPOINTS.LOGIN}`);

  const response = await fetch(target, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: request.body,
    // @ts-expect-error: duplex is required for ReadableStream body but missing from RequestInit type
    duplex: 'half',
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    return NextResponse.json(errorBody, { status: response.status });
  }

  const { accessToken, refreshToken, ...responseBody } =
    (await response.json()) as PostLoginResponse;

  await setTokens({ accessToken, refreshToken });

  return NextResponse.json(responseBody, { status: response.status });
}
