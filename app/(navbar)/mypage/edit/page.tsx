'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MyPageEdit, MyPageEditLoading } from '@/src/features/mypage';
import ErrorBoundaryFallback from '@/src/shared/components/error-boundary/ErrorBoundaryFallback';

export default function MypageEdit() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <ErrorBoundaryFallback onRetry={resetErrorBoundary} className="h-[600px]" />
          )}
        >
          <Suspense fallback={<MyPageEditLoading />}>
            <MyPageEdit />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
