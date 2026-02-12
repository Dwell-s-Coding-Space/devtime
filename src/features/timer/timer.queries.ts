import { queryOptions } from '@tanstack/react-query';

import { clientApi } from '@/src/shared/api/client';

import { createTimerApi } from './timer.api';

const timerApi = createTimerApi(clientApi);

export const timerQueries = {
  // queries
  current: () =>
    queryOptions({
      queryKey: ['timer', 'current'],
      queryFn: timerApi.getCurrent,
    }),

  //mutation
  startTimer: () => ({
    mutationFn: timerApi.postStart,
  }),
  updateTimer: () => ({
    mutationFn: timerApi.putUpdate,
  }),
  stopTimer: () => ({
    mutationFn: timerApi.postStop,
  }),
  deleteTimer: () => ({
    mutationFn: timerApi.deleteCurrent,
  }),
  updateTask: () => ({
    mutationFn: timerApi.putTasks,
  }),
};
