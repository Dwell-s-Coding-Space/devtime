import { GetRankingListResponse } from '@/src/features/ranking/ranking.schema';
import type Api from '@/src/shared/api/core';

export type RankingOption = 'total' | 'avg';

export type RankingListProp = {
  sortBy?: RankingOption;
  limit?: number;
  page?: number;
};

export const createRankingApi = (api: Api) => ({
  getList: ({ sortBy, limit, page }: RankingListProp) => {
    const searchParams = new URLSearchParams();
    if (sortBy) searchParams.set('sortBy', sortBy);
    if (limit) searchParams.set('limit', String(limit));
    if (page) searchParams.set('page', String(page));
    const query = searchParams.toString();

    return api.get<GetRankingListResponse>(`/rankings${query ? `?${query}` : ''}`);
  },
});
