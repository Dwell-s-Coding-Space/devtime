'use client';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { UnauthorizedError } from '../api/error';
import { ROUTES } from '../constants/routes';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      if (error instanceof UnauthorizedError) {
        window.location.href = ROUTES.LOGIN;
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      if (error instanceof UnauthorizedError) {
        window.location.href = ROUTES.LOGIN;
      }
    },
  }),
});

const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
