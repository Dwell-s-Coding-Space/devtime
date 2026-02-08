'use server';

import { getTokens } from './auth.utils';

export async function checkIsLoggedIn() {
  const { accessToken } = await getTokens();

  return !!accessToken;
}
