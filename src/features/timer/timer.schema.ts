/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { asDateOrNull } from '@/src/lib/schema/primitives/date';
import { asArray } from '@/src/lib/schema/primitives/object';

/**
 * time response
 */

const splitTimeItemSchema = z.object({
  date: asDateOrNull(),
  timeSpent: z.number(),
});

const timerResponseSchema = z.object({
  timerId: z.string(),
  studyLogId: z.string(),
  splitTimes: asArray(splitTimeItemSchema),
  startTime: z.string(),
  lastUpdateTime: z.string(),
});

export type TimerResponse = z.infer<typeof timerResponseSchema>;
