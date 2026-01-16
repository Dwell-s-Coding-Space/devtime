/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';

/**
 * time response
 */

const splitTimeItemSchema = z.object({
  date: z.string(),
  timeSpent: z.number(),
});

const timerResponseSchema = z.object({
  timerId: z.string(),
  studyLogId: z.string(),
  splitTimes: z.array(splitTimeItemSchema),
  startTime: z.string(),
  lastUpdateTime: z.string(),
});

export type TimerResponse = z.infer<typeof timerResponseSchema>;
