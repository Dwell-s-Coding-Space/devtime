import { cookies } from 'next/headers';

import Api from './core';

export const createServerApi = async () => {
  const cookieStore = await cookies();

  return new Api(`${process.env.SITE_URL}/api/proxy`, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
  });
};
