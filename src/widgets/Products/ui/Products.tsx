'use client';
import { useBestSeller, useProducts } from '@/entities/product/model';
import { useReviewSummary } from '@/entities/review/model/useReviewSummary';
import { MobileProductFilter } from '@/features/mobile-filters/ui';
import {
  ProductFilter,
  useFilter,
  useSelectAndFilterSort,
} from '@/features/product-filters';
import {
  ProductPagination,
  useProductPagination,
} from '@/features/product-pagination';
import { ErrorBoundary } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ProductContent } from '.';
import type { ViewMode } from '../model/types';
import { ProductToolBar } from './ProductToolBar';

import styles from './Products.module.scss';

export const Products = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [shouldLoadMobileFilter, setShouldLoadMobileFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, isPending, isError, refetch, error } = useProducts();
  const { data: bestSeller } = useBestSeller();
  const {
    data: reviewSummery,
    isPending: isPendingReview,
    isError: isErrorReview,
  } = useReviewSummary();

  const reviewData = {
    reviewSummery,
    isPendingReview,
    isErrorReview,
  };

  const { resetFilter, filter } = useFilter(
    useShallow((state) => ({
      resetFilter: state.resetFilter,
      filter: state.filter,
    }))
  );

  const { filteredData, resultCount } = useSelectAndFilterSort(data, filter);

  const { paginatedData, page, pageSize, setPage, setPageSize, total } =
    useProductPagination(filteredData);

  /* Reset the page when filters change */
  useEffect(() => {
    setPage(1);
  }, [filter.select, filter.search, filter.checkbox, setPage]);

  /* Сохраняем состояние 'mode' в storage, чтобы при размонтировке сохранить их отображение */
  useEffect(() => {
    const savedMode = localStorage.getItem('products-view-mode');

    if (savedMode === 'grid' || savedMode === 'list') {
      setViewMode(savedMode);
    }
  }, []);

  const onPageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMobileFilters = () => {
    setShouldLoadMobileFilter(true);
    setFilterOpen(true);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('products-view-mode', mode);
  };

  return (
    <>
      <ProductToolBar
        page={page}
        pageSize={pageSize}
        total={total}
        viewMode={viewMode}
        onChangeViewMode={handleViewModeChange}
        openMobileFilters={openMobileFilters}
      />
      <div className={styles.productSection}>
        <ProductFilter className={styles.filtersDesktop} />

        <div>
          <ErrorBoundary>
            <ProductContent
              products={{
                data: paginatedData,
                bestSellerIds: bestSeller ?? [],
              }}
              isPending={isPending}
              isError={isError}
              error={error}
              onRetry={refetch}
              reviews={reviewData}
              viewMode={viewMode}
            />
          </ErrorBoundary>

          <div className={styles.pagination}>
            <ProductPagination
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>

      {shouldLoadMobileFilter && (
        <MobileProductFilter
          filterOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          styles={{
            body: `${styles.drawerBody}`,
            header: `${styles.drawerTitle}`,
          }}
          btnStyles={styles.drawerBtns}
          resetFilter={resetFilter}
          resultCount={resultCount}>
          <ProductFilter className={styles.filtersMobile} />
        </MobileProductFilter>
      )}
    </>
  );
};
