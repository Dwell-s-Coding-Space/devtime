import type Api from '@/src/shared/api/core';
import { BaseResponse } from '@/src/shared/schema/common.schema';
import {
  GetCheckEmailResponse,
  GetCheckNicknameResponse,
  PostLoginBody,
  PostLoginResponse,
  PostRefreshBody,
  PostRefreshResponse,
  PostSignUpBody,
} from '@/src/features/auth/auth.schema';

export const createAuthApi = (api: Api) => ({
  getCheckEmail: (email: string) =>
    api.get<GetCheckEmailResponse>(`/signup/check-email?email=${email}`),
  getCheckNickname: (nickname: string) =>
    api.get<GetCheckNicknameResponse>(`/signup/check-nickname?nickname=${nickname}`),
  postSignUp: (reqBody: PostSignUpBody) =>
    api.post<BaseResponse, PostSignUpBody>('/signup', { body: reqBody }),
  postLogin: (reqBody: PostLoginBody) =>
    api.post<PostLoginResponse, PostLoginBody>('/auth/login', { body: reqBody }),
  postLogout: () => api.post<BaseResponse>('/auth/logout', { body: {} }),
  postRefresh: (reqBody: PostRefreshBody) =>
    api.post<PostRefreshResponse, PostRefreshBody>('/auth/refresh', {
      body: reqBody,
    }),
});
