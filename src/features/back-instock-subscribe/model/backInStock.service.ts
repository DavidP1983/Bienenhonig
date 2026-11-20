import { backInStockApi } from '../api/backInStock.api';
import type { TBackInStock } from './types';

export const backInStockService = {
  placeSubmission: (payload: TBackInStock) =>
    backInStockApi.placeSubmission(payload),
};
