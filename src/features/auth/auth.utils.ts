import { cookies } from 'next/headers';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from './auth.constants';

export const getTokens = async () => {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_COOKIE.name)?.value,
    refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE.name)?.value,
  };
};

export const setTokens = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE.name, accessToken, ACCESS_TOKEN_COOKIE.options);
  cookieStore.set(REFRESH_TOKEN_COOKIE.name, refreshToken, REFRESH_TOKEN_COOKIE.options);
};

export const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE.name, accessToken, ACCESS_TOKEN_COOKIE.options);
};

export const removeTokens = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE.name);
  cookieStore.delete(REFRESH_TOKEN_COOKIE.name);
};
