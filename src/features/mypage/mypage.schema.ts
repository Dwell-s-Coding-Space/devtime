/* eslint-disable @typescript-eslint/no-unused-vars */
import { PostSignUpBody } from '@/src/features/auth/auth.schema';
import { BaseResponse } from '@/src/lib/schema/common.schema';
import { asDateOrNull } from '@/src/lib/schema/primitives/date';
import { asArray } from '@/src/lib/schema/primitives/object';
import z from 'zod';

/**
 * 회원정보 조회
 * get /profile
 */

export const profileSchema = z.object({
  career: z.string(),
  purpose: z.string(),
  goal: z.string(),
  techStacks: asArray(z.string()),
  profileImage: z.string(),
});

const profileResponseSchema = z.object({
  email: z.string(),
  nickname: z.string(),
  profile: profileSchema,
});

export type Profile = z.infer<typeof profileSchema>;
export type GetProfileResponse = z.infer<typeof profileResponseSchema>;

/**
 * 프로필 생성
 * post /profile
 */

export type PostProfileBody = Profile;

/**
 * 회원정보 수정
 * put /profile
 */

export type PutProfileBody = Partial<
  Pick<PostSignUpBody, 'password'> & Pick<GetProfileResponse, 'nickname'> & Profile
>;

/**
 * 기술 스택 검색
 * get /tech-stacks
 */

const techStackItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: asDateOrNull(),
  updatedAt: asDateOrNull(),
});

const techStackListResponseSchema = z.object({
  results: asArray(techStackItemSchema),
});

export type TechStackItem = z.infer<typeof techStackItemSchema>;
export type GetTechStackListResponse = z.infer<typeof techStackListResponseSchema>;

/**
 * 기술 스택 추가
 * post /tech-stacks
 */

export type PostTechStackBody = Pick<TechStackItem, 'name'>;

export interface PostTechStackResponse extends Pick<BaseResponse, 'message'> {
  techstack: TechStackItem;
}
