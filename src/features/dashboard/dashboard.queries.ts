import { queryOptions } from '@tanstack/react-query';

import { clientApi } from '@/src/shared/api/client';

import { createDashboardApi } from './dashboard.api';

const dashboardApi = createDashboardApi(clientApi);

export const dashboardQueries = {
  // key prefix
  studyLogsKey: () => ['dashboard', 'studyLogs'] as const,

  // queries
  stats: () =>
    queryOptions({
      queryKey: ['dashboard', 'stat'],
      queryFn: dashboardApi.getStats,
    }),
  heatmap: () =>
    queryOptions({
      queryKey: ['dashboard', 'heatmap'],
      queryFn: dashboardApi.getHeatmap,
    }),
  studyLogs: ({ page, limit, date }: { limit?: number; page?: number; date?: string }) =>
    queryOptions({
      queryKey: [...dashboardQueries.studyLogsKey(), page, limit, date],
      queryFn: () => dashboardApi.getStudyLogs({ page, limit, date }),
    }),
  studyLogDetail: (logId: string) =>
    queryOptions({
      queryKey: ['dashboard', 'studyLogDetail', logId],
      queryFn: () => dashboardApi.getStudyLogDetail(logId),
    }),

  // mutations
  deleteStudyLog: () => ({
    mutationFn: dashboardApi.deleteStudyLog,
  }),
};
