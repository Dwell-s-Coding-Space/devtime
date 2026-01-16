import { clientApi } from '@/src/lib/api/client';
import { GetRankingListResponse } from '@/src/features/ranking/ranking.schema';

export const getRankings = () => {
  return clientApi.get<GetRankingListResponse>('/rankings');
};
