'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '@/src/shared/components/error-boundary/ErrorBoundaryFallback';

import RankingPage from './RankingPage';
import RankingPageLoading from './RankingPageLoading';

export default function RankingBoundary() {
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
