import { GetRankingListResponse } from '@/src/features/ranking/ranking.schema';
import type Api from '@/src/shared/api/core';

export const createRankingApi = (api: Api) => ({
  getList: () => api.get<GetRankingListResponse>('/rankings'),
});
