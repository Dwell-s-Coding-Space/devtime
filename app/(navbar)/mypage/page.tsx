'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MyPage, MyPageLoading } from '@/src/features/mypage';
import ErrorBoundaryFallback from '@/src/shared/components/error-boundary/ErrorBoundaryFallback';

export default function Mypage() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorBoundaryFallback onRetry={resetErrorBoundary} className="h-[420px]" />
          )}
        >
          <Suspense fallback={<MyPageLoading />}>
            <MyPage />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
