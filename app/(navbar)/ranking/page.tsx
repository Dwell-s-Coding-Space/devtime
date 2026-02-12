import { Suspense } from 'react';

import { RankingPage, RankingPageLoading } from '@/src/features/ranking';

export default function Ranking() {
  return (
    <Suspense fallback={<RankingPageLoading />}>
      <RankingPage />
    </Suspense>
  );
}
