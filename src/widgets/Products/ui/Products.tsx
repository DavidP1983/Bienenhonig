'use client';
import { useProducts } from '@/entities/product/model/useProducts';
import { useReviewSummary } from '@/entities/review/model/useReviewSummary';
import { MobileProductFilter } from '@/features/mobile-filters/ui';
import {
  useFilter,
  useSelectAndFilterSort,
} from '@/features/product-filters/model';
import { ProductFilter } from '@/features/product-filters/ui';
import { useProductPagination } from '@/features/product-pagination/model';
import { ProductPagination } from '@/features/product-pagination/ui';
import { BsSliders2 } from '@/shared/assets/icons';
import { Button, ErrorBoundary } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ProductContent } from '.';
import { ProductViewToggle } from './ProductViewToggle';

import styles from './Products.module.scss';

export type ViewMode = 'grid' | 'list';

export const Products = () => {
  const t = useTranslations('Products');

  const [filterOpen, setFilterOpen] = useState(false);
  const [shouldLoadMobileFilter, setShouldLoadMobileFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, isPending, isError, refetch, error } = useProducts();
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

  const showingItems = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingPerPage = Math.min(page * pageSize, total);

  /* Reset the page when filters change */
  useEffect(() => {
    setPage(1);
  }, [filter.select, filter.search, filter.checkbox, setPage]);

  /* Сохраняем данные о показе карточек в storage, чтобы при размонтировке сохранить состояние */
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
      <div className={styles.totalItems}>
        <p className={styles.totalItemPerPage}>
          {t('showingItems', {
            showingItems,
            showingPerPage,
            total,
          })}
        </p>
        <ProductViewToggle
          viewMode={viewMode}
          onChangeViewMode={handleViewModeChange}
        />
        <div className={styles.mobileFilterBtn}>
          <Button
            icon={<BsSliders2 className={styles.icon} />}
            props={{
              type: 'default',
              onClick: openMobileFilters,
            }}>
            {t('filter')}
          </Button>
        </div>
      </div>
      <section className={styles.productSection}>
        <ProductFilter className={styles.filtersDesktop} />

        <div>
          <ErrorBoundary>
            <ProductContent
              data={paginatedData}
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
      </section>

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
