import { isServer, MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';

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
