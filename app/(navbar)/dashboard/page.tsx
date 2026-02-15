'use client';
import { QueryErrorResetBoundary, useQuery, useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { StatSummary, StudyLogList, WeeklyStatBar, YearlyStatGrid } from '@/src/features/dashboard';
import { dashboardQueries } from '@/src/features/dashboard/dashboard.queries';
// import ErrorBoundary from '@/src/shared/components/error-boundary/ErrorBoundary';
import ErrorBoundaryFallback from '@/src/shared/components/error-boundary/ErrorBoundaryFallback';
import Skeleton from '@/src/shared/components/skeleton/Skeleton';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { refetch } = useQuery(dashboardQueries.heatmap());

  return (
    <>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<Skeleton className="h-[264px] bg-gray-300" />}>
          <div className="flex items-center gap-4">
            <StatSummary />
            <WeeklyStatBar />
          </div>
        </Suspense>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <ErrorBoundaryFallback onRetry={resetErrorBoundary} className="h-[300px]" />
              )}
            >
              <Suspense fallback={<Skeleton className="h-[300px]" />}>
                <YearlyStatGrid />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <Suspense fallback={<Skeleton className="h-[500px] bg-gray-300" />}>
          <StudyLogList />
        </Suspense>
      </div>
    </>
  );
}
