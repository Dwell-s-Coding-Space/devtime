/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { PostSignUpBody } from '@/src/features/auth/auth.schema';
import { BaseResponse } from '@/src/shared/schema/common.schema';
import { asDateOrNull } from '@/src/shared/schema/primitives/date';
import { asArray } from '@/src/shared/schema/primitives/object';
import {
  CAREER_OPTIONS,
  CUSTOM_PURPOSE_LABEL,
  PURPOSE_OPTIONS,
} from '@/app/(navbar)/mypage/edit/page';

/**
 * 회원정보 조회
 * get /profile
 */

export const profileSchema = z.object({
  career: z.enum(CAREER_OPTIONS),
  purpose: z.string(),
  goal: z.string(),
  techStacks: asArray(z.string()),
  profileImage: z.string().nullable(),
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

export const profileBodySchema = z
  .object({
    career: z.enum(CAREER_OPTIONS),
    purpose: z.union([
      z.enum(PURPOSE_OPTIONS),
      z.object({ type: z.literal(CUSTOM_PURPOSE_LABEL), detail: z.string() }),
    ]),
    goal: z.string(),
    techStacks: asArray(z.string()),
    profileImage: z.string().nullable(),
  })
  .partial();

export type PostProfileBody = z.infer<typeof profileBodySchema>;

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

export const techStackItemSchema = z.object({
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
  techStack: TechStackItem;
}
