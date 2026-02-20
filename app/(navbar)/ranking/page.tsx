import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { RankingBoundary } from '@/src/features/ranking';
import { rankingQueries } from '@/src/features/ranking/ranking.queries';

export default async function Ranking() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(rankingQueries.list({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RankingBoundary />
    </HydrationBoundary>
  );
}
