import type Api from '@/src/lib/api/core';
import { BaseResponse } from '@/src/lib/schema/common.schema';
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
  getCheckEmail: () => api.get<GetCheckEmailResponse>('/signup/check-email'),
  getCheckNickname: () => api.get<GetCheckNicknameResponse>('/signup/check-nickname'),
  postSignUp: (reqBody: PostSignUpBody) =>
    api.post<BaseResponse, PostSignUpBody>('/signup', { body: reqBody }),
  postLogin: (reqBody: PostLoginBody) =>
    api.post<PostLoginResponse, PostLoginBody>('/auth/login', { body: reqBody }),
  postLogout: () => api.post<BaseResponse>('/auth/logout'),
  postRefresh: (reqBody: PostRefreshBody) =>
    api.post<PostRefreshResponse, PostRefreshBody>('/auth/refresh', {
      body: reqBody,
    }),
});
