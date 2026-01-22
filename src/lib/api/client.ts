const isAbsoluteUrl = (url: string) => {
  return url.startsWith('http');
};

const isErrorWithName = (e: unknown, name: string): e is Error => {
  return e instanceof Error && e.name === name;
};

type RequestOptionsWithoutBody = Omit<RequestInit, 'body'> & {
  timeout?: number;
};

type RequestOptionsWithBody<TBody = unknown> = Omit<RequestInit, 'body'> & {
  timeout?: number;
  body?: TBody;
};

class Api {
  private baseUrl;
  private options;

  constructor(baseUrl: string, baseOptions?: RequestInit) {
    this.baseUrl = baseUrl;
    this.options = baseOptions || {};
  }

  private request = async <T>(path: string, options?: RequestOptionsWithBody) => {
    const { timeout = 5000, body, ...init } = options || {};

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

        throw new Error(
          JSON.stringify({
            status: res.status,
            message: errorBody?.message || res.statusText || 'Request Failed',
          })
        );
      }

      if (res.status === 204) {
        return undefined as T;
      }

      const data = (await res.json()) as T;

      return data;
    } catch (e: unknown) {
      if (isErrorWithName(e, 'TimeoutError')) {
        throw new Error(JSON.stringify({ status: 408, message: 'Request Timeout' }));
      }

      if (isErrorWithName(e, 'AbortError')) {
        throw e;
      }

      if (e instanceof Error) {
        throw e;
      }

      throw new Error(JSON.stringify({ status: 0, message: 'Unknown Error' }));
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

export const clientApi = new Api(process?.env?.BASE_URL || '', {
  headers: { 'Content-Type': 'application/json' },
});
