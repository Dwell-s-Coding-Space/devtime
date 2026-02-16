'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { RankingPage, RankingPageLoading } from '@/src/features/ranking';
import ErrorBoundaryFallback from '@/src/shared/components/error-boundary/ErrorBoundaryFallback';

export default function Ranking() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorBoundaryFallback onRetry={resetErrorBoundary} className="h-[500px]" />
          )}
        >
          <Suspense fallback={<RankingPageLoading />}>
            <RankingPage />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
