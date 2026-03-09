import z from 'zod';

import { dateString } from '@/src/shared/schema/primitives/date';
import { paginationSchema } from '@/src/shared/schema/response.schema';
import { HoursSchema, SecondsSchema } from '@/src/shared/schema/time.schema';

/**
 * 사용자의 공부 기록 통계 조회
 * get /stats
 */

const weekdayStudyTimeSchema = z.object({
  Monday: SecondsSchema,
  Tuesday: SecondsSchema,
  Wednesday: SecondsSchema,
  Thursday: SecondsSchema,
  Friday: SecondsSchema,
  Saturday: SecondsSchema,
  Sunday: SecondsSchema,
});

export const studyStatResponseSchema = z.object({
  consecutiveDays: z.number().int().nonnegative(),
  totalStudyTime: SecondsSchema,
  averageDailyStudyTime: SecondsSchema,
  taskCompletionRate: z.number().min(0).max(100),
  weekdayStudyTime: weekdayStudyTimeSchema,
});

export type GetStudyStatResponse = z.infer<typeof studyStatResponseSchema>;

/**
 * 학습 히트맵 데이터 조회
 * get /heatmap
 */

const heatmapItemSchema = z.object({
  date: dateString(),
  studyTimeHours: HoursSchema,
  colorLevel: z.number().int().min(0).max(5),
});

export const heatmapListResponseSchema = z.object({
  heatmap: z.array(heatmapItemSchema),
});

export type GetHeatmapListResponse = z.infer<typeof heatmapListResponseSchema>;

/**
 * 학습 기록 목록 조회
 * get /study-logs
 */

const studyLogItemSchema = z.object({
  id: z.string(),
  date: dateString(),
  todayGoal: z.string(),
  studyTime: SecondsSchema,
  totalTasks: z.number().int().nonnegative(),
  incompleteTasks: z.number().int().nonnegative(),
  completionRate: z.number().min(0).max(100),
});

export const studyLogListResponseSchema = z.object({
  success: z.literal(true),
  data: z.object({
    studyLogs: z.array(studyLogItemSchema),
    pagination: paginationSchema,
  }),
});

export type StudyLogListResponse = z.infer<typeof studyLogListResponseSchema>;

/**
 * 특정 학습 기록 상세 정보
 * get /study-logs/:id
 */

const taskItemSchema = z.object({
  id: z.string(),
  content: z.string(),
  isCompleted: z.boolean(),
});

const studyLogDetailSchema = studyLogItemSchema
  .omit({
    incompleteTasks: true,
    totalTasks: true,
  })
  .extend({
    tasks: z.array(taskItemSchema),
    review: z.string(),
  });

export const studyLogDetailResponseSchema = z.object({
  success: z.literal(true),
  data: studyLogDetailSchema,
});

export type TaskItem = z.infer<typeof taskItemSchema>;
export type GetStudyLogDetailResponse = z.infer<typeof studyLogDetailResponseSchema>;
