'use client';

import {
  defaultShouldDehydrateQuery,
  isServer,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { UnauthorizedError } from '../api/error';
import { ROUTES } from '../constants/routes';

function makeClientQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
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
}

function makeServerQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
        shouldRedactErrors: error => {
          return false;
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeServerQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeClientQueryClient();
    return browserQueryClient;
  }
}

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
