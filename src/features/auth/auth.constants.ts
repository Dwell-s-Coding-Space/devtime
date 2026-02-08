export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const BASE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: IS_PRODUCTION,
  sameSite: 'lax',
  path: '/',
} as const;

export const ACCESS_TOKEN_COOKIE = {
  name: 'accessToken',
  options: {
    ...BASE_COOKIE_OPTIONS,
    maxAge: 60 * 60, // 1h
  },
} as const;

export const REFRESH_TOKEN_COOKIE = {
  name: 'refreshToken',
  options: {
    ...BASE_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 10, // 10 days
  },
} as const;
