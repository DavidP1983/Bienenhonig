'use client';
import { useBestSeller, useProducts } from '@/entities/product/model';
import { useReviewSummary } from '@/entities/review/model/useReviewSummary';
import {
  ProductFilter,
  useFilter,
  useSelectAndFilterSort,
} from '@/features/product-filters';
import {
  AppliedFilterChips,
  ProductFilterDrawer,
  ProductSearch,
} from '@/features/product-filters/ui';
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
  const [shouldLoadProductFilter, setShouldLoadProductFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, isPending, isError, refetch, error } = useProducts();
  const { data: bestSeller } = useBestSeller();
  const {
    data: reviewSummary,
    isPending: isPendingReview,
    isError: isErrorReview,
  } = useReviewSummary();

  const reviewData = {
    reviewSummary,
    isPendingReview,
    isErrorReview,
  };

  /* Фильтрация */
  const { clearAllFilters, applyFilter, cancelDraft, filter, search } =
    useFilter(
      useShallow((state) => ({
        filter: state.filter,
        search: state.search,
        clearAllFilters: state.clearAllFilters,
        applyFilter: state.applyFilter,
        cancelDraft: state.cancelDraft,
      }))
    );

  const { filteredData, resultCount } = useSelectAndFilterSort(
    data,
    filter,
    search
  );

  /* Пагинация */
  const { paginatedData, page, pageSize, setPage, setPageSize, total } =
    useProductPagination(filteredData);

  /* Reset the page when filters change */
  useEffect(() => {
    setPage(1);
  }, [filter, search, setPage]);

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

  const openProductFilters = () => {
    setShouldLoadProductFilter(true);
    setFilterOpen(true);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('products-view-mode', mode);
  };

  return (
    <>
      <div className={styles.searchInput}>
        <ProductSearch />
      </div>
      <AppliedFilterChips />
      <ProductToolBar
        page={page}
        pageSize={pageSize}
        total={total}
        viewMode={viewMode}
        onChangeViewMode={handleViewModeChange}
        openProductFilters={openProductFilters}
      />
      <div className={styles.productSection}>
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

      {shouldLoadProductFilter && (
        <ProductFilterDrawer
          filterOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          styles={{
            body: `${styles.drawerBody}`,
            header: `${styles.drawerTitle}`,
          }}
          btnStyles={styles.drawerBtns}
          clearAllFilters={clearAllFilters}
          applyFilter={applyFilter}
          cancelDraft={cancelDraft}
          resultCount={resultCount}>
          <ProductFilter />
        </ProductFilterDrawer>
      )}
    </>
  );
};
