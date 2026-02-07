import { queryOptions } from '@tanstack/react-query';
import { clientApi } from '@/src/shared/api/client';
import { createRankingApi } from './ranking.api';

const rankingApi = createRankingApi(clientApi);

export const rankingQueries = {
  list: () =>
    queryOptions({
      queryKey: ['ranking', 'list'],
      queryFn: rankingApi.getList,
    }),
};
