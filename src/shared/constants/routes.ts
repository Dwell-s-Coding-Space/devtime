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

export const GUEST_ONLY_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP] as const;
export const PUBLIC_ROUTES = [ROUTES.HOME] as const;
