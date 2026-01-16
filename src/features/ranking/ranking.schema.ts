/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { paginationSchema } from '@/src/lib/schema/common.schema';
import { asInt, asNonNegative } from '@/src/lib/schema/primitives/number';
import { asArray } from '@/src/lib/schema/primitives/object';

/**
 * ranking response
 */

const techStackSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const profileSchema = z.object({
  career: z.string(),
  purpose: z.string(),
  profileImage: z.string(),
  techStacks: asArray(techStackSchema),
});

const rankingItemSchema = z.object({
  rank: asInt(),
  userId: z.string(),
  nickname: z.string(),
  totalStudyTime: asNonNegative(),
  averageStudyTime: asNonNegative(),
  profile: profileSchema,
});

const rankingListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    rankings: asArray(rankingItemSchema),
    pagination: paginationSchema,
  }),
});

export type RankingListResponse = z.infer<typeof rankingListResponseSchema>;
