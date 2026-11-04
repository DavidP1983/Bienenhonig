'use client';
import { useQuery } from '@tanstack/react-query';
import { productService } from './product.service';
import { productKeys } from './queryKeys';

export const useBestSeller = () => {
  return useQuery({
    queryKey: productKeys.bestSeller(),
    queryFn: ({ signal }) => productService.getBestSellerProductIds(signal),
  });
};
