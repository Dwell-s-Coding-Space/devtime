import { NextRequest, NextResponse } from 'next/server';

import { getTokens, removeTokens } from '@/src/features/auth/auth.utils';
import { API_ENDPOINTS } from '@/src/shared/constants/apiEndpoints';
import { BACKEND_URL } from '@/src/shared/constants/env';

export async function POST(request: NextRequest) {
  const target = new URL(`${BACKEND_URL}${API_ENDPOINTS.LOGOUT}`);
  const { accessToken } = await getTokens();

  const response = await fetch(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: request.body,
    // @ts-expect-error: duplex is required for ReadableStream body but missing from RequestInit type
    duplex: 'half',
  });

  console.log('response', response);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    return NextResponse.json(errorBody, { status: response.status });
  }

  await removeTokens();

  const responseBody = await response.json();
  return NextResponse.json(responseBody, { status: response.status });
}
