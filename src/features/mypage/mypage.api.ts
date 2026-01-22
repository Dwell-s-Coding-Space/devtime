import { clientApi } from '@/src/lib/api/client';
import { BaseResponse } from '@/src/lib/schema/common.schema';
import {
  GetProfileResponse,
  GetTechStackListResponse,
  PostProfileBody,
  PostTechStackBody,
  PostTechStackResponse,
  PutProfileBody,
} from '@/src/features/mypage/mypage.schema';

export const getProfile = () => {
  return clientApi.get<GetProfileResponse>('/profile');
};

export const postProfile = (reqBody: PostProfileBody) => {
  return clientApi.post<BaseResponse, PostProfileBody>('/profile', {
    body: reqBody,
  });
};

export const putProfile = (reqBody: PutProfileBody) => {
  return clientApi.put<BaseResponse, PutProfileBody>('/profile', {
    body: reqBody,
  });
};

export const getTechStacks = () => {
  return clientApi.get<GetTechStackListResponse>('/tech-stacks');
};

export const postTechStacks = (reqBody: PostTechStackBody) => {
  return clientApi.post<PostTechStackResponse, PostTechStackBody>('/tech-stacks', {
    body: reqBody,
  });
};
