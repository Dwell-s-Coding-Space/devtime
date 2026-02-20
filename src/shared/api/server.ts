import { getTokens } from '@/src/features/auth/auth.utils';

import Api from './core';

export const createServerApi = async () => {
  const accessToken = (await getTokens()).accessToken;

  return new Api(`${process.env.API_BASE_URL}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });
};
