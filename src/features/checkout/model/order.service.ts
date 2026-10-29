import { ordersApi } from '../api/orders.api';
import type { CreateOrderPayload } from './types';

export const orderService = {
  placeOrder: (payload: CreateOrderPayload, idempotencyKey: string) =>
    ordersApi.placeOrder(payload, idempotencyKey),
};
