/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { paginationSchema } from '@/src/shared/schema/common.schema';
import { asInt, asNonNegative } from '@/src/shared/schema/primitives/number';
import { asArray } from '@/src/shared/schema/primitives/object';
import { profileSchema, techStackItemSchema } from '@/src/features/mypage/mypage.schema';

/**
 * 전체 유저의 학습 시간 랭킹 조회
 * get /rankings
 */

const rankingProfileSchema = profileSchema
  .omit({
    goal: true,
    techStacks: true,
  })
  .extend({ techStacks: asArray(techStackItemSchema.pick({ id: true, name: true })) });

const rankingItemSchema = z.object({
  rank: asInt(),
  userId: z.string(),
  nickname: z.string(),
  totalStudyTime: asNonNegative(),
  averageStudyTime: asNonNegative(),
  profile: rankingProfileSchema,
});

const rankingListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    rankings: asArray(rankingItemSchema),
    pagination: paginationSchema,
  }),
});

export type GetRankingListResponse = z.infer<typeof rankingListResponseSchema>;
