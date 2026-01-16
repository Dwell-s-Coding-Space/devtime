import { clientApi } from '@/src/lib/api/client';
import { BaseResponse } from '@/src/lib/schema/common.schema';
import {
  GetHeatmapListResponse,
  GetStudyLogDetailResponse,
  GetStudyStatResponse,
  StudyLogListResponse,
} from './dashboard.schema';

export const getStats = () => {
  return clientApi.get<GetStudyStatResponse>('/stats');
};

export const getHeatmap = () => {
  return clientApi.get<GetHeatmapListResponse>('/heatmap');
};

export const getStudyLogs = () => {
  return clientApi.get<StudyLogListResponse>('/study-logs');
};

export const getStudyLogDetail = (id: string) => {
  return clientApi.get<GetStudyLogDetailResponse>(`/study-logs/${id}`);
};

export const deleteStudyLog = (id: string) => {
  return clientApi.delete<BaseResponse>(`/study-logs/${id}`);
};
