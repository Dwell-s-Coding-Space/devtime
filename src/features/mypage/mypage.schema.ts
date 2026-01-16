/* eslint-disable @typescript-eslint/no-unused-vars */
import { asDateOrNull } from '@/src/lib/schema/primitives/date';
import { asArray } from '@/src/lib/schema/primitives/object';
import z from 'zod';

/**
 * profile response
 */

const profileSchema = z.object({
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

/**
 * tech stack response
 */

const techStackItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: asDateOrNull(),
});

const techStackListResponseSchema = z.object({
  results: asArray(techStackItemSchema),
});

export type ProfileResponse = z.infer<typeof profileResponseSchema>;
export type TechStackListResponse = z.infer<typeof techStackListResponseSchema>;
