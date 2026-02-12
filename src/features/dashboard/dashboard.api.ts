import type Api from '@/src/shared/api/core';
import { BaseResponse } from '@/src/shared/schema/common.schema';
import {
  GetHeatmapListResponse,
  GetStudyLogDetailResponse,
  GetStudyStatResponse,
  StudyLogListResponse,
} from './dashboard.schema';

export const createDashboardApi = (api: Api) => ({
  getStats: () => api.get<GetStudyStatResponse>('/stats'),
  getHeatmap: () => api.get<GetHeatmapListResponse>('/heatmap'),
  getStudyLogs: ({ limit, page, date }: { limit?: number; page?: number; date?: string }) => {
    const searchParams = new URLSearchParams();
    if (limit) searchParams.set('limit', String(limit));
    if (page) searchParams.set('page', String(page));
    if (date) searchParams.set('date', date);

    return api.get<StudyLogListResponse>('/study-logs' + '?' + searchParams.toString());
  },
  getStudyLogDetail: (id: string) => api.get<GetStudyLogDetailResponse>(`/study-logs/${id}`),
  deleteStudyLog: (id: string) => api.delete<BaseResponse>(`/study-logs/${id}`),
});
