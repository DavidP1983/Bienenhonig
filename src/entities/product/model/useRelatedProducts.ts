'use client';
import { useQuery } from '@tanstack/react-query';
import { productService } from './product.service';
import { productKeys } from './queryKeys';

export const useRelatedProducts = (id: string, limit: number) => {
  return useQuery({
    queryKey: productKeys.related(id, limit),
    queryFn: ({ signal }) =>
      productService.getRelatedProducts(id, limit, signal),
    enabled: Boolean(id),
  });
};
