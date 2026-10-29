'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewKeys } from './queryKeys';
import { reviewService } from './review.service';

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewService.createReview,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: reviewKeys.byProduct(productId),
      });
    },
  });
};
