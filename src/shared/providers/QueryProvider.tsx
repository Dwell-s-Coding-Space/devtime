'use client';

import { ReactNode } from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ROUTES } from '../constants/routes';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      const parsed = JSON.parse(error.message);
      if (parsed.status === 401) {
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
