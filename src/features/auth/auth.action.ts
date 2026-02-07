'use server';

import { cookies } from 'next/headers';

export async function checkIsLoggedIn() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return !!accessToken;
}
