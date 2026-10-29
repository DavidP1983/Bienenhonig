import { api } from '@/shared/api/client';
import { Product } from '../model/types';

export const productApi = {
  getProducts: (signal?: AbortSignal) =>
    api.get<Product[]>('/api/products', { signal }),

  getProductById: (id: string, size?: string, signal?: AbortSignal) =>
    api.get<Product>(`/api/products/${id}${size ? `?size=${size}` : ''}`, {
      signal,
    }),

  getRelatedProducts: (id: string, limit = 3, signal?: AbortSignal) =>
    api.get<Product[]>(`/api/products/${id}/related?limit=${limit}`, {
      signal,
    }),
};
