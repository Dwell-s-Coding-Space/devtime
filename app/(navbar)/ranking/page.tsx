import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { RankingBoundary } from '@/src/features/ranking';
import { rankingQueries } from '@/src/features/ranking/ranking.queries';
import { getQueryClient } from '@/src/shared/providers/QueryProvider';

export default function Ranking() {
  const queryClient = getQueryClient();
  queryClient.prefetchInfiniteQuery(rankingQueries.list({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RankingBoundary />
    </HydrationBoundary>
  );
}
