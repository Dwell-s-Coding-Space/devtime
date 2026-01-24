import type Api from '@/src/lib/api/core';
import { BaseResponse } from '@/src/lib/schema/common.schema';
import {
  GetHeatmapListResponse,
  GetStudyLogDetailResponse,
  GetStudyStatResponse,
  StudyLogListResponse,
} from './dashboard.schema';

export const createDashboardApi = (api: Api) => ({
  getStats: () => api.get<GetStudyStatResponse>('/stats'),
  getHeatmap: () => api.get<GetHeatmapListResponse>('/heatmap'),
  getStudyLogs: () => api.get<StudyLogListResponse>('/study-logs'),
  getStudyLogDetail: (id: string) => api.get<GetStudyLogDetailResponse>(`/study-logs/${id}`),
  deleteStudyLog: (id: string) => api.delete<BaseResponse>(`/study-logs/${id}`),
});
