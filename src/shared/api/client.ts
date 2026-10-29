import { ApiError } from '../errors/ApiError';
import { handleResponse } from './handleResponse';
import { HTTPRequestMethods, RequestConfig, RequestOptions } from './types';

class ApiRequest {
  baseURL: string;
  defaultHeaders: object;

  constructor(baseURL: string, defaultHeaders = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  async request<T>(
    endpoint: string,
    method: HTTPRequestMethods,
    options: RequestOptions = {}
  ): Promise<T> {
    const { data, headers, signal } = options;

    const config: RequestConfig = {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      signal,
    };

    if (data) {
      config.headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      const data = await handleResponse(response);

      if (!data) {
        throw new ApiError(
          'The server returned no data',
          'EMPTY_RESPONSE',
          response.status,
          response.statusText
        );
      }
      return data as T;
    } catch (e) {
      if (e instanceof ApiError) {
        throw e;
      }
      if ((e as Error).name === 'AbortError') {
        throw e;
      }

      throw new ApiError('Network request failed', 'NETWORK_ERROR');
    }
  }

  get<T>(endpoint: string, options: RequestOptions = {}) {
    return this.request<T>(endpoint, 'GET', options);
  }

  post<T>(endpoint: string, data: unknown, options: RequestOptions = {}) {
    return this.request<T>(endpoint, 'POST', { ...options, data });
  }
}

export const api = new ApiRequest(process.env.NEXT_PUBLIC_API_BASE ?? '');
