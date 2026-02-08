/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { paginationSchema } from '@/src/shared/schema/common.schema';
import { asBoolean } from '@/src/shared/schema/primitives/boolean';
import { asClampedNumber, asNonNegative } from '@/src/shared/schema/primitives/number';
import { asArray } from '@/src/shared/schema/primitives/object';
import { asDateOrNull } from '@/src/shared/schema/primitives/date';

/**
 * 사용자의 공부 기록 통계 조회
 * get /stats
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

export type GetStudyStatResponse = z.infer<typeof studyStatResponseSchema>;

/**
 * 학습 히트맵 데이터 조회
 * get /heatmap
 */

const heatmapItemSchema = z.object({
  date: asDateOrNull(),
  studyTimeHours: asNonNegative(),
  colorLevel: asClampedNumber(0, 5),
});

const heatmapListResponseSchema = z.object({
  heatmap: asArray(heatmapItemSchema),
});

export type GetHeatmapListResponse = z.infer<typeof heatmapListResponseSchema>;

/**
 * 학습 기록 목록 조회
 * get /study-logs
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

export type StudyLogListResponse = z.infer<typeof studyLogListResponseSchema>;

/**
 * 특정 학습 기록 상세 정보
 * get /study-logs/:id
 */

const taskItemSchema = z.object({
  id: z.string(),
  content: z.string(),
  isCompleted: asBoolean(),
});

const studyLogDetailSchema = studyLogItemSchema
  .omit({
    incompleteTasks: true,
    totalTasks: true,
  })
  .extend({
    tasks: asArray(taskItemSchema),
    review: z.string(),
  });

const studyLogDetailResponseSchema = z.object({
  success: z.literal(true),
  data: studyLogDetailSchema,
});

export type TaskItem = z.infer<typeof taskItemSchema>;
export type GetStudyLogDetailResponse = z.infer<typeof studyLogDetailResponseSchema>;
