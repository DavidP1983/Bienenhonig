import { api } from '@/shared/api/client';
import type { Wishlist } from '../model/types';

export const whishListApi = {
  getProductsByIds: (productIds: string[], signal?: AbortSignal) =>
    api.post<Wishlist[]>('/api/products/wishlist', { productIds }, { signal }),
};
