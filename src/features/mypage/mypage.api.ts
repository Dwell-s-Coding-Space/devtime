import {
  GetProfileResponse,
  GetTechStackListResponse,
  PostProfileBody,
  PostTechStackBody,
  PostTechStackResponse,
  PutProfileBody,
} from '@/src/features/mypage/mypage.schema';
import type Api from '@/src/shared/api/core';
import { BaseResponse } from '@/src/shared/schema/common.schema';

export const createMyPageApi = (api: Api) => ({
  getProfile: () => api.get<GetProfileResponse>('/profile'),
  postProfile: (reqBody: PostProfileBody) =>
    api.post<BaseResponse, PostProfileBody>('/profile', {
      body: reqBody,
    }),
  putProfile: (reqBody: PutProfileBody) =>
    api.put<BaseResponse, PutProfileBody>('/profile', {
      body: reqBody,
    }),
  getTechStacks: () => api.get<GetTechStackListResponse>('/tech-stacks'),
  postTechStacks: (reqBody: PostTechStackBody) =>
    api.post<PostTechStackResponse, PostTechStackBody>('/tech-stacks', {
      body: reqBody,
    }),
});
