import { api } from '@/shared/api/client';
import type { TBackInStock, TBackInStockResponse } from '../model/types';

export const backInStockApi = {
  placeSubmission: (payload: TBackInStock) =>
    api.post<TBackInStockResponse>('/api/back-in-stock', payload),
};
