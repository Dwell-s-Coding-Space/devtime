import z from 'zod';

import { profileSchema, techStackItemSchema } from '@/src/features/mypage/mypage.schema';
import { paginationSchema } from '@/src/shared/schema/common.schema';

/**
 * 전체 유저의 학습 시간 랭킹 조회
 * get /rankings
 */

const rankingProfileSchema = profileSchema
  .omit({
    goal: true,
    techStacks: true,
  })
  .extend({ techStacks: z.array(techStackItemSchema.pick({ id: true, name: true })) });

const rankingItemSchema = z.object({
  rank: z.number().int(),
  userId: z.string(),
  nickname: z.string(),
  totalStudyTime: z.number().nonnegative(),
  averageStudyTime: z.number().nonnegative(),
  profile: rankingProfileSchema,
});

export const rankingListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    rankings: z.array(rankingItemSchema),
    pagination: paginationSchema,
  }),
});

export type GetRankingListResponse = z.infer<typeof rankingListResponseSchema>;
