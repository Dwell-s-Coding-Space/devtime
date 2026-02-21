'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '@/src/shared/components/error-boundary/ErrorBoundaryFallback';

import MyPageEdit from './MyPageEdit';
import MyPageEditLoading from './MyPageEditLoading';

export default function MyPageEditBoundary() {
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
