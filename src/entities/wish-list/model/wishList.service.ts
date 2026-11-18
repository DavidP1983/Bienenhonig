import { whishListApi } from '../api/wishList.api';

export const wishListService = {
  getProductsByIds: (productIds: string[], signal?: AbortSignal) =>
    whishListApi.getProductsByIds(productIds, signal),
};
