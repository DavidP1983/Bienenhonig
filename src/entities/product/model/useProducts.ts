'use client';
import { useQuery } from '@tanstack/react-query';
import { productService } from './product.service';
import { productKeys } from './queryKeys';

export const useProducts = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: ({ signal }) => productService.getProducts(signal),
    refetchInterval: 60_000,
  });
};
