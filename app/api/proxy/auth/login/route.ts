import { NextRequest, NextResponse } from 'next/server';
import { PostLoginResponse } from '@/src/features/auth/auth.schema';
import { setTokens } from '@/src/features/auth/auth.utils';
import { API_ENDPOINTS } from '@/src/shared/constants/apiEndpoints';

const BACKEND_URL = process.env.API_BASE_URL;

export async function POST(request: NextRequest) {
  const target = new URL(`${BACKEND_URL}${API_ENDPOINTS.LOGIN}`);

  const response = await fetch(target, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: request.body,
    duplex: 'half',
  } as RequestInit);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    return NextResponse.json(errorBody, { status: response.status });
  }

  const { accessToken, refreshToken, ...responseBody } =
    (await response.json()) as PostLoginResponse;

  await setTokens({ accessToken, refreshToken });

  return NextResponse.json(responseBody, { status: response.status });
}
