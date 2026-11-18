'use client';
import { useQuery } from '@tanstack/react-query';
import { wishlistKeys } from './queryKeys';
import { wishListService } from './wishList.service';

export const useWishlistProducts = (productIds: string[]) => {
  return useQuery({
    queryKey: wishlistKeys.products(productIds),
    queryFn: ({ signal }) =>
      wishListService.getProductsByIds(productIds, signal),
    enabled: productIds.length > 0,
  });
};
