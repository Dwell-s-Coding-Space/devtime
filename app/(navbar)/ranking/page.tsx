import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getTokens } from '@/src/features/auth/auth.utils';
import { RankingBoundary } from '@/src/features/ranking';
import { createRankingApi } from '@/src/features/ranking/ranking.api';
import { rankingQueries } from '@/src/features/ranking/ranking.queries';
import { createServerApi } from '@/src/shared/api/server';
import { getQueryClient } from '@/src/shared/providers/get-query-client';

export default async function Ranking() {
  const queryClient = getQueryClient();
  const serverApi = await createServerApi();
  const rankingApi = createRankingApi(serverApi);
  const { accessToken } = await getTokens();

  if (accessToken) {
    await queryClient.prefetchInfiniteQuery({
      ...rankingQueries.list({}),
      queryFn: ({ pageParam }) =>
        rankingApi.getList({ page: pageParam, limit: 5, sortBy: 'total' }),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RankingBoundary />
    </HydrationBoundary>
  );
}
