/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { paginationSchema } from '@/src/lib/schema/common.schema';
import { asBoolean } from '@/src/lib/schema/primitives/boolean';
import {
  asClampedNumber,
  asNonNegative,
} from '@/src/lib/schema/primitives/number';
import { asArray } from '@/src/lib/schema/primitives/object';
import { asDateOrNull } from '@/src/lib/schema/primitives/date';

/**
 * stats response
 */

const weekdayStudyTimeSchema = z.object({
  Monday: asNonNegative(),
  Tuesday: asNonNegative(),
  Wednesday: asNonNegative(),
  Thursday: asNonNegative(),
  Friday: asNonNegative(),
  Saturday: asNonNegative(),
  Sunday: asNonNegative(),
});

const studyStatResponseSchema = z.object({
  consecutiveDays: asNonNegative(),
  totalStudyTime: asNonNegative(),
  averageDailyStudyTime: asNonNegative(),
  taskCompletionRate: asNonNegative(),
  weekdayStudyTime: weekdayStudyTimeSchema,
});

/**
 * /heatmap response
 */

const heatmapItemSchema = z.object({
  date: asDateOrNull(),
  studyTimeHours: asNonNegative(),
  colorLevel: asClampedNumber(0, 5),
});

const heatmapListResponseSchema = z.object({
  heatmap: asArray(heatmapItemSchema),
});

/**
 * study-log list response
 */

const studyLogItemSchema = z.object({
  id: z.string(),
  date: asDateOrNull(),
  todayGoal: z.string(),
  studyTime: asNonNegative(),
  totalTasks: asNonNegative(),
  incompleteTasks: asNonNegative(),
  completionRate: z.number(),
});

const studyLogListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    studyLogs: asArray(studyLogItemSchema),
    pagination: paginationSchema,
  }),
});

/**
 * study-log detail response
 */

const taskItemSchema = z.object({
  id: z.string(),
  content: z.string(),
  isCompleted: asBoolean(),
});

const studyLogDetailSchema = z.object({
  id: z.string(),
  date: asDateOrNull(),
  todayGoal: z.string(),
  studyTime: z.number(),
  tasks: asArray(taskItemSchema),
  review: z.string(),
  completionRate: z.number(),
});

const studyLogDetailResponseSchema = z.object({
  success: z.literal(true),
  data: studyLogDetailSchema,
});

export type StudyStatResponse = z.infer<typeof studyStatResponseSchema>;
export type HeatmapListResponse = z.infer<typeof heatmapListResponseSchema>;
export type StudyLogListResponse = z.infer<typeof studyLogListResponseSchema>;
export type StudyLogDetailResponse = z.infer<
  typeof studyLogDetailResponseSchema
>;
