import Api from './core';
import { cookies } from 'next/headers';

export const createServerApi = async () => {
  const cookieStore = await cookies();

  return new Api(`${process.env.SITE_URL}/api/proxy`, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
  });
};
