'use client';
import { useQuery } from '@tanstack/react-query';
import { productService } from './product.service';
import { productKeys } from './queryKeys';

export const useProductById = (id: string, size?: string) => {
  return useQuery({
    queryKey: productKeys.detail(id, size),
    queryFn: ({ signal }) => productService.getProductById(id, size, signal),
    enabled: Boolean(id),
    refetchInterval: 60_000,
  });
};
