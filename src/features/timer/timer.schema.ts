/* eslint-disable @typescript-eslint/no-unused-vars */
import z from 'zod';
import { asDateOrNull } from '@/src/lib/schema/primitives/date';
import { asArray } from '@/src/lib/schema/primitives/object';
import { BaseResponse } from '@/src/lib/schema/common.schema';
import { TaskItem } from '@/src/features/dashboard/dashboard.schema';

/**
 * 활성화된 타이머 조회
 * get /timers
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

export type GetTimerResponse = z.infer<typeof timerResponseSchema>;

/**
 * 타이머 시작
 * post /timers
 */

export type PostTimerStartBody = {
  todayGoal: string;
  tasks: string[];
};

export type PostTimerStartResponse = Pick<BaseResponse, 'message'> &
  Pick<GetTimerResponse, 'startTime' | 'studyLogId' | 'timerId'>;

/**
 * 타이머 상태 업데이트 (10분마다)
 * put /timers/:id
 */

export type PutTimerUpdateBody = Pick<GetTimerResponse, 'splitTimes'>;

export type PutTimerUpdateResponse = Pick<BaseResponse, 'message'> &
  Pick<GetTimerResponse, 'startTime' | 'splitTimes' | 'lastUpdateTime'>;

/**
 * 타이머 종료
 * post /timers/:id/stop
 */

export type PostTimerStopBody = Pick<GetTimerResponse, 'splitTimes'> & {
  tasks: Omit<TaskItem, 'id'>[];
  review: string;
};

export type PostTimerStopResponse = Pick<BaseResponse, 'message'> & {
  totalTime: number;
  endTime: string;
};

/**
 * 타이머 리셋/삭제
 * delete /timers/:id
 */

export type DeleteTimerResponse = Pick<BaseResponse, 'message'>;

/**
 * 할 일 업데이트
 * put /:studyLogId/tasks
 */
export type PutTasksUpdateBody = Pick<PostTimerStopBody, 'tasks'>;
export type PutTasksUpdateResponse = BaseResponse;
