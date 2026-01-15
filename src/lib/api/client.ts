const isAbsoluteUrl = (url: string) => {
  return url.startsWith('http');
};

const isErrorWithName = (e: unknown, name: string): e is Error => {
  return e instanceof Error && e.name === name;
};

class Api {
  private baseUrl;
  private options;

  constructor(baseUrl: string, baseOptions?: RequestInit) {
    this.baseUrl = baseUrl;
    this.options = baseOptions || {};
  }

  public clientFetch = async <T>(
    path: string,
    timeout?: number,
    options?: RequestInit,
  ) => {
    const normalizedPath = isAbsoluteUrl(path)
      ? path
      : path.startsWith('/')
      ? `${this.baseUrl}${path}`
      : `${this.baseUrl}/${path}`;

    const mergedHeaders = new Headers(this.options.headers);
    new Headers(options?.headers).forEach((value, key) =>
      mergedHeaders.set(key, value),
    );

    const _timeout = timeout || 5000;

    try {
      const res = await fetch(normalizedPath, {
        ...this.options,
        ...options,
        headers: mergedHeaders,
        signal: options?.signal
          ? AbortSignal.any([options.signal, AbortSignal.timeout(_timeout)])
          : AbortSignal.timeout(_timeout),
      });

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null);

        throw new Error(
          JSON.stringify({
            status: res.status,
            message: errorBody?.message || res.statusText || 'Request Failed',
          }),
        );
      }

      if (res.status === 204) {
        return undefined as T;
      }

      const data = (await res.json()) as T;

      return data;
    } catch (e: unknown) {
      if (isErrorWithName(e, 'TimeoutError')) {
        throw new Error(
          JSON.stringify({ status: 408, message: 'Request Timeout' }),
        );
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
}

export default Api;

export const clientApi = new Api(process?.env?.BASE_URL || '', {
  headers: { 'Content-Type': 'application/json' },
});
