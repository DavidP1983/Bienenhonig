import { api } from '@/shared/api/client';
import type { CreateOrderPayload, CreateOrderResponse } from '../model/types';

export const ordersApi = {
  placeOrder: (payload: CreateOrderPayload, idempotencyKey: string) =>
    api.post<CreateOrderResponse>('/api/orders', payload, {
      headers: {
        'Idempotency-Key': idempotencyKey,
      },
    }),
};
