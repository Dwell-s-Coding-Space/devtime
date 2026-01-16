/* eslint-disable @typescript-eslint/no-unused-vars */
import { paginationSchema } from '@/src/shared/common.schema';
import z from 'zod';

/**
 * stats response
 */

const weekdayStudyTimeSchema = z.object({
  Monday: z.number(),
  Tuesday: z.number(),
  Wednesday: z.number(),
  Thursday: z.number(),
  Friday: z.number(),
  Saturday: z.number(),
  Sunday: z.number(),
});

const studyStatResponseSchema = z.object({
  consecutiveDays: z.number(),
  totalStudyTime: z.number(),
  averageDailyStudyTime: z.number(),
  taskCompletionRate: z.number(),
  weekdayStudyTime: weekdayStudyTimeSchema,
});

/**
 * /heatmap response
 */

const heatmapItemSchema = z.object({
  date: z.string(),
  studyTimeHours: z.number(),
  colorLevel: z.number(),
});

const heatmapListResponseSchema = z.object({
  heatmap: z.array(heatmapItemSchema),
});

/**
 * study-log list response
 */

const studyLogItemSchema = z.object({
  id: z.string(),
  date: z.string(),
  todayGoal: z.string(),
  studyTime: z.number(),
  totalTasks: z.number(),
  incompleteTasks: z.number(),
  completionRate: z.number(),
});

const studyLogListResponseSchema = z.object({
  success: z.literal(true),
  data: {
    studyLogs: z.array(studyLogItemSchema),
    pagination: paginationSchema,
  },
});

/**
 * study-log detail response
 */

const taskItemSchema = z.object({
  id: z.string(),
  content: z.string(),
  isCompleted: z.boolean(),
});

const studyLogDetailSchema = z.object({
  id: z.string(),
  date: z.string(),
  todayGoal: z.string(),
  studyTime: z.number(),
  tasks: z.array(taskItemSchema),
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
