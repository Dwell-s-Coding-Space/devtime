/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { paginationSchema } from '@/src/shared/common.schema';

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
  techStacks: z.array(techStackSchema),
});

const rankingItemSchema = z.object({
  rank: z.number(),
  userId: z.string(),
  nickname: z.string(),
  totalStudyTime: z.number(),
  averageStudyTime: z.number(),
  profile: profileSchema,
});

const rankingListResponseSchema = z.object({
  success: z.literal(true),
  data: {
    rankings: z.array(rankingItemSchema),
    pagination: paginationSchema,
  },
});

export type RankingListResponse = z.infer<typeof rankingListResponseSchema>;
