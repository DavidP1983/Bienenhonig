'use client';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from './category.service';
import { categoryKeys } from './queryKeys';

export const useCategories = () => {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: ({ signal }) => categoryService.getCategories(signal),
  });
};
