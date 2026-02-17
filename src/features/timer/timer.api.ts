import type Api from '@/src/shared/api/core';

import {
  DeleteTimerResponse,
  GetTimerResponse,
  PostTimerStartBody,
  PostTimerStartResponse,
  PostTimerStopBody,
  PostTimerStopResponse,
  PutTasksUpdateBody,
  PutTimerUpdateBody,
  PutTimerUpdateResponse,
  timerResponseSchema,
} from './timer.schema';

export const createTimerApi = (api: Api) => ({
  getCurrent: () => api.get<GetTimerResponse>('/timers', { schema: timerResponseSchema }),
  postStart: (reqBody: PostTimerStartBody) =>
    api.post<PostTimerStartResponse, PostTimerStartBody>('/timers', {
      body: reqBody,
    }),
  putUpdate: ({ id, reqBody }: { id: string; reqBody: PutTimerUpdateBody }) =>
    api.put<PutTimerUpdateResponse, PutTimerUpdateBody>(`/timers/${id}`, {
      body: reqBody,
    }),
  postStop: ({ id, reqBody }: { id: string; reqBody: PostTimerStopBody }) =>
    api.post<PostTimerStopResponse, PostTimerStopBody>(`/timers/${id}/stop`, {
      body: reqBody,
    }),
  deleteCurrent: (id: string) => api.delete<DeleteTimerResponse>(`/timers/${id}`),
  putTasks: ({ studyLogId, reqBody }: { studyLogId: string; reqBody: PutTasksUpdateBody }) =>
    api.put<PutTimerUpdateResponse, PutTasksUpdateBody>(`/${studyLogId}/tasks`, {
      body: reqBody,
    }),
});
