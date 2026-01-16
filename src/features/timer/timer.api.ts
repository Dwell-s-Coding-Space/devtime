import { clientApi } from '@/src/lib/api/client';
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

export const getTimer = () => {
  return clientApi.get<GetTimerResponse>('/timers');
};

export const postTimerStart = (reqBody: PostTimerStartBody) => {
  return clientApi.post<PostTimerStartResponse, PostTimerStartBody>('/timers', {
    body: reqBody,
  });
};

export const putTimerUpdate = (id: string, reqBody: PutTimerUpdateBody) => {
  return clientApi.put<PutTimerUpdateResponse, PutTimerUpdateBody>(
    `/timers/${id}`,
    { body: reqBody },
  );
};

export const postTimerStop = (id: string, reqBody: PostTimerStopBody) => {
  return clientApi.post<PostTimerStopResponse, PostTimerStopBody>(
    `/timers/${id}/stop`,
    {
      body: reqBody,
    },
  );
};

export const deleteTimer = (id: string) => {
  return clientApi.delete<DeleteTimerResponse>(`/timers/${id}`);
};
