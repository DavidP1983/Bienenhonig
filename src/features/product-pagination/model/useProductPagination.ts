import { Product } from '@/entities/product/model/types';
import { useMemo, useState } from 'react';

const DEFAULT_PAGE_SIZE = 4;

export const useProductPagination = (data: Product[]) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const total = data.length;

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * pageSize;

    return data.slice(startIndex, startIndex + pageSize);
  }, [data, page, pageSize]);

  return {
    paginatedData,
    page,
    pageSize,
    setPage,
    setPageSize,
    total,
  };
};
