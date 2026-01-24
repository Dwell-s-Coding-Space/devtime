import type Api from '@/src/lib/api/core';
import { GetRankingListResponse } from '@/src/features/ranking/ranking.schema';

export const createRankingApi = (api: Api) => ({
  getList: () => api.get<GetRankingListResponse>('/rankings'),
});
