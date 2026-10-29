export type HTTPRequestMethods = 'GET' | 'POST';

interface Headers {
  [content: string]: string;
}

export type RequestOptions = {
  data?: unknown;
  headers?: Headers;
  signal?: AbortSignal;
};

export interface RequestConfig {
  method: HTTPRequestMethods;
  headers: Headers;
  body?: string;
  signal?: AbortSignal;
}
