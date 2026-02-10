import Api from './core';
import { cookies } from 'next/headers';

export const createServerApi = async () => {
  const cookieStore = await cookies();

  console.log('[createServerApi] backend url', process.env.API_BASE_URL);
  console.log('[createServerApi] site url', process.env.SITE_URL);

  return new Api(`${process.env.SITE_URL}/api/proxy`, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
  });
};
