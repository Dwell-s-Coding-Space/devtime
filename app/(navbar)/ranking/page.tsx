import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { RankingBoundary } from '@/src/features/ranking';
import { RANKING_OPTION_MAP } from '@/src/features/ranking/components/RankingPage';
import { rankingQueries } from '@/src/features/ranking/ranking.queries';

export default async function Ranking() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    rankingQueries.list({ sortBy: RANKING_OPTION_MAP['총 학습 시간'], limit: 5 })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RankingBoundary />
    </HydrationBoundary>
  );
}
