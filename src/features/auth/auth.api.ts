import { clientApi } from '@/src/lib/api/client';
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

export const postSignUp = (reqBody: PostSignUpBody) => {
  return clientApi.post<BaseResponse, PostSignUpBody>('/signup', {
    body: reqBody,
  });
};

export const getCheckEmail = () => {
  return clientApi.get<GetCheckEmailResponse>('/signup/check-email');
};

export const getCheckNickname = () => {
  return clientApi.get<GetCheckNicknameResponse>('/signup/check-nickname');
};

export const postAuthLogin = (reqBody: PostLoginBody) => {
  return clientApi.post<PostLoginResponse, PostLoginBody>('/auth/login', {
    body: reqBody,
  });
};

export const postAuthLogout = () => {
  return clientApi.post<BaseResponse>('/auth/logout');
};

export const postAuthRefresh = (reqBody: PostRefreshBody) => {
  return clientApi.post<PostRefreshResponse, PostRefreshBody>('/auth/refresh', {
    body: reqBody,
  });
};
