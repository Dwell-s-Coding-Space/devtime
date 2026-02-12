import { Suspense } from 'react';

import { StatSummary, StudyLogList, WeeklyStatBar, YearlyStatGrid } from '@/src/features/dashboard';
import Skeleton from '@/src/shared/components/skeleton/Skeleton';

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<Skeleton className="h-[264px] bg-gray-300" />}>
          <div className="flex items-center gap-4">
            <StatSummary />
            <WeeklyStatBar />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[300px] bg-gray-300" />}>
          <YearlyStatGrid />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[500px] bg-gray-300" />}>
          <StudyLogList />
        </Suspense>
      </div>
    </>
  );
}
