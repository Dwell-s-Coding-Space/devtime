import { captureException } from '@sentry/nextjs';
import { ZodType } from 'zod';

import { ApiError, NotFoundError, TimeoutError, UnauthorizedError, ValidationError } from './error';

const isAbsoluteUrl = (url: string) => {
  return url.startsWith('http');
};

const isErrorWithName = (e: unknown, name: string): e is Error => {
  return e instanceof Error && e.name === name;
};

type RequestOptionsWithoutBody = Omit<RequestInit, 'body'> & {
  timeout?: number;
  schema?: ZodType;
};

type RequestOptionsWithBody<TBody = unknown> = Omit<RequestInit, 'body'> & {
  timeout?: number;
  body?: TBody;
  schema?: ZodType;
};

class Api {
  private baseUrl;
  private options;

  constructor(baseUrl: string, baseOptions?: RequestInit) {
    this.baseUrl = baseUrl;
    this.options = baseOptions || {};
  }

  private request = async <T>(path: string, options?: RequestOptionsWithBody) => {
    const { timeout = 5000, body, schema, ...init } = options || {};

    const normalizedPath = isAbsoluteUrl(path)
      ? path
      : path.startsWith('/')
        ? `${this.baseUrl}${path}`
        : `${this.baseUrl}/${path}`;

    const mergedHeaders = new Headers(this.options.headers);
    new Headers(init.headers).forEach((value, key) => mergedHeaders.set(key, value));

    try {
      const res = await fetch(normalizedPath, {
        ...this.options,
        ...init,
        headers: mergedHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: init.signal
          ? AbortSignal.any([init.signal, AbortSignal.timeout(timeout)])
          : AbortSignal.timeout(timeout),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        const message = errorBody?.error?.message || res.statusText || 'Request Failed';

        switch (res.status) {
          case 401:
            throw new UnauthorizedError(message);
          case 404:
            throw new NotFoundError(message);
          default:
            throw new ApiError(res.status, message);
        }
      }

      if (res.status === 204) {
        return undefined as T;
      }

      const data = await res.json();

      if (schema) {
        const result = schema.safeParse(data);
        if (!result.success) {
          const error = new ValidationError();
          captureException(error, {
            extra: {
              endpoint: normalizedPath,
              errors: result.error.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message,
              })),
            },
          });
        }
      }

      return data as T;
    } catch (e: unknown) {
      if (isErrorWithName(e, 'TimeoutError')) {
        throw new TimeoutError();
      }

      if (isErrorWithName(e, 'AbortError')) {
        throw e;
      }

      if (e instanceof Error) {
        throw e;
      }

      throw new ApiError(0, 'Unknown Error');
    }
  };

  // public methods
  get<TResponse>(path: string, options?: RequestOptionsWithoutBody): Promise<TResponse> {
    return this.request<TResponse>(path, { ...options, method: 'GET' });
  }

  post<TResponse, TBody = unknown>(
    path: string,
    options?: RequestOptionsWithBody<TBody>
  ): Promise<TResponse> {
    return this.request<TResponse>(path, { ...options, method: 'POST' });
  }

  put<TResponse, TBody = unknown>(
    path: string,
    options?: RequestOptionsWithBody<TBody>
  ): Promise<TResponse> {
    return this.request<TResponse>(path, { ...options, method: 'PUT' });
  }

  patch<TResponse, TBody = unknown>(
    path: string,
    options?: RequestOptionsWithBody<TBody>
  ): Promise<TResponse> {
    return this.request<TResponse>(path, { ...options, method: 'PATCH' });
  }

  delete<TResponse>(path: string, options?: RequestOptionsWithoutBody): Promise<TResponse> {
    return this.request<TResponse>(path, { ...options, method: 'DELETE' });
  }
}

export default Api;
