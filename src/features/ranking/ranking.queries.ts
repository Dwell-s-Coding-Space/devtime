import { infiniteQueryOptions } from '@tanstack/react-query';

import { clientApi } from '@/src/shared/api/client';

import { createRankingApi, RankingListProp } from './ranking.api';

const rankingApi = createRankingApi(clientApi);

export const rankingQueries = {
  list: ({ limit, sortBy }: Omit<RankingListProp, 'page'>) =>
    infiniteQueryOptions({
      queryKey: ['ranking', 'list', sortBy, limit],
      queryFn: ({ pageParam }) => rankingApi.getList({ page: pageParam, limit, sortBy }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.data.pagination.hasNext ? allPages.length + 1 : undefined;
      },
    }),
};
