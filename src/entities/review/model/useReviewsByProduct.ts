import { useQuery } from '@tanstack/react-query';
import { reviewKeys } from './queryKeys';
import { reviewService } from './review.service';

export const useReviewsByProduct = (productId: string, page = 1, limit = 3) => {
  return useQuery({
    queryKey: [...reviewKeys.byProduct(productId), page, limit],
    queryFn: ({ signal }) =>
      reviewService.getReviewsByProduct(productId, page, limit, signal),
    enabled: Boolean(productId),
  });
};
