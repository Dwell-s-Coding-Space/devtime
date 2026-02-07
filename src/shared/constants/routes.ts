export const ROUTES = {
  HOME: '/home',
  SIGNUP: '/signup',
  PROFILE_SETTING: '/profile-setting',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  RANKING: '/ranking',
  MYPAGE: '/mypage',
  MYPAGE_EDIT: '/mypage/edit',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.PROFILE_SETTING,
  ROUTES.HOME,
] as const;
