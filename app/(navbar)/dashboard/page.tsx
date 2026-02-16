'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { StatSummary, StudyLogList, WeeklyStatBar, YearlyStatGrid } from '@/src/features/dashboard';
import ErrorBoundaryFallback from '@/src/shared/components/error-boundary/ErrorBoundaryFallback';
import Skeleton from '@/src/shared/components/skeleton/Skeleton';

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <ErrorBoundaryFallback onRetry={resetErrorBoundary} className="h-[264px]" />
              )}
            >
              <Suspense fallback={<Skeleton className="h-[264px] bg-gray-300" />}>
                <div className="flex items-center gap-4">
                  <StatSummary />
                  <WeeklyStatBar />
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>

        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <ErrorBoundaryFallback onRetry={resetErrorBoundary} className="h-[300px]" />
              )}
            >
              <Suspense fallback={<Skeleton className="h-[300px] bg-gray-300" />}>
                <YearlyStatGrid />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>

        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <ErrorBoundaryFallback onRetry={resetErrorBoundary} className="h-[500px]" />
              )}
            >
              <Suspense fallback={<Skeleton className="h-[500px] bg-gray-300" />}>
                <StudyLogList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </>
  );
}
