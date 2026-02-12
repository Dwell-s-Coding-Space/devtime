import { queryOptions } from '@tanstack/react-query';

import { clientApi } from '@/src/shared/api/client';

import { checkIsLoggedIn } from './auth.action';
import { createAuthApi } from './auth.api';

const authApi = createAuthApi(clientApi);

export const authQueries = {
  // server action
  checkIsLoggedIn: () =>
    queryOptions({
      queryKey: ['auth', 'isLoggedIn'],
      queryFn: checkIsLoggedIn,
    }),
  // queries
  checkEmail: (email: string) =>
    queryOptions({
      queryKey: ['auth', 'checkEmail', email],
      queryFn: () => authApi.getCheckEmail(email),
    }),
  checkNickname: (nickname: string) =>
    queryOptions({
      queryKey: ['auth', 'checkNickname', nickname],
      queryFn: () => authApi.getCheckNickname(nickname),
    }),

  // mutations
  signUp: () => ({ mutationFn: authApi.postSignUp }),
  login: () => ({ mutationFn: authApi.postLogin }),
  logout: () => ({ mutationFn: authApi.postLogout }),
  refresh: () => ({ mutationFn: authApi.postRefresh }),
};
