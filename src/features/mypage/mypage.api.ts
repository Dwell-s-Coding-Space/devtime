import type Api from '@/src/shared/api/core';
import { BaseResponse } from '@/src/shared/schema/common.schema';

import {
  GetProfileResponse,
  GetTechStackListResponse,
  PostPresignedUrlBody,
  PostPresignedUrlResponse,
  PostProfileBody,
  PostTechStackBody,
  PostTechStackResponse,
  profileResponseSchema,
  PutProfileBody,
  techStackListResponseSchema,
} from './mypage.schema';

export const createMyPageApi = (api: Api) => ({
  getProfile: () => api.get<GetProfileResponse>('/profile', { schema: profileResponseSchema }),
  postProfile: (reqBody: PostProfileBody) =>
    api.post<BaseResponse, PostProfileBody>('/profile', {
      body: reqBody,
    }),
  putProfile: (reqBody: PutProfileBody) =>
    api.put<BaseResponse, PutProfileBody>('/profile', {
      body: reqBody,
    }),
  getTechStacks: () =>
    api.get<GetTechStackListResponse>('/tech-stacks', { schema: techStackListResponseSchema }),
  postTechStacks: (reqBody: PostTechStackBody) =>
    api.post<PostTechStackResponse, PostTechStackBody>('/tech-stacks', {
      body: reqBody,
    }),
  postPresignedUrl: (reqBody: PostPresignedUrlBody) =>
    api.post<PostPresignedUrlResponse, PostPresignedUrlBody>('/file/presigned-url', {
      body: reqBody,
    }),
});
