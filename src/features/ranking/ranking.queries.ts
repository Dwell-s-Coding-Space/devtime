import { queryOptions } from '@tanstack/react-query';

import { clientApi } from '@/src/shared/api/client';

import { createRankingApi, RankingListProp } from './ranking.api';

const rankingApi = createRankingApi(clientApi);

export const rankingQueries = {
  list: ({ page, limit, sortBy }: RankingListProp) =>
    queryOptions({
      queryKey: ['ranking', 'list', sortBy, page, limit],
      queryFn: () => rankingApi.getList({ page, limit, sortBy }),
    }),
};
