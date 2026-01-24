import type Api from '@/src/lib/api/core';
import {
  DeleteTimerResponse,
  GetTimerResponse,
  PostTimerStartBody,
  PostTimerStartResponse,
  PostTimerStopBody,
  PostTimerStopResponse,
  PutTimerUpdateBody,
  PutTimerUpdateResponse,
} from '@/src/features/timer/timer.schema';

export const createTimerApi = (api: Api) => ({
  getCurrent: () => api.get<GetTimerResponse>('/timers'),
  postStart: (reqBody: PostTimerStartBody) =>
    api.post<PostTimerStartResponse, PostTimerStartBody>('/timers', {
      body: reqBody,
    }),
  putUpdate: (id: string, reqBody: PutTimerUpdateBody) =>
    api.put<PutTimerUpdateResponse, PutTimerUpdateBody>(`/timers/${id}`, {
      body: reqBody,
    }),
  postStop: (id: string, reqBody: PostTimerStopBody) =>
    api.post<PostTimerStopResponse, PostTimerStopBody>(`/timers/${id}/stop`, {
      body: reqBody,
    }),
  deleteCurrent: (id: string) => api.delete<DeleteTimerResponse>(`/timers/${id}`),
});
