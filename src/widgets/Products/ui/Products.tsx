'use client';
import { useBestSeller, useProducts } from '@/entities/product/model';
import { useReviewSummary } from '@/entities/review/model/useReviewSummary';
import { useFilter, useSelectAndFilterSort } from '@/features/product-filters';
import {
  AppliedFilterChips,
  ProductFilterDrawer,
  ProductSearch,
} from '@/features/product-filters/ui';
import {
  ProductPagination,
  useProductPagination,
} from '@/features/product-pagination';
import { ErrorBoundary, ResultModal } from '@/shared/ui';
import { Spin } from 'antd';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ProductContent } from '.';
import type { ViewMode } from '../model/types';
import { useHoneyGuideRecommendation } from '../model/useHoneyGuideRecommendations';
import { ProductToolBar } from './ProductToolBar';

const HoneyGuide = dynamic(
  () =>
    import('@/features/product-filters/ui/HoneyGuide').then(
      (mod) => mod.HoneyGuide
    ),
  {
    loading: () => <Spin />,
  }
);

const ProductFilter = dynamic(
  () =>
    import('@/features/product-filters/ui/ProductFilters').then(
      (mod) => mod.ProductFilter
    ),
  {
    loading: () => <Spin />,
  }
);

import styles from './Products.module.scss';

export const Products = () => {
  const t = useTranslations('Products');

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<'filter' | 'guid' | null>(
    null
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  /* Запросы по получению данных*/
  const { data, isPending, isError, refetch, error } = useProducts();
  const { data: bestSeller } = useBestSeller();
  const {
    data: reviewSummary,
    isPending: isPendingReview,
    isError: isErrorReview,
  } = useReviewSummary();

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

  /* Honey Guid Logic */
  const {
    honeyGuideOpen,
    setHoneyGuideOpen,
    honeyGuideAttributes,
    handleOpenHoneyGuid,
    handleBackToProducts,
    handleHoneyGuideFind,
    isHoneyGuideActive,
    recommendedProducts,
  } = useHoneyGuideRecommendation({
    data,
    setActiveOverlay,
  });

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

  /* Opening filters */
  const openProductFilters = () => {
    setActiveOverlay('filter');
    setFilterOpen(true);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('products-view-mode', mode);
  };

  /* При появлении одного из тригеров скрывать инфо о продукте на странице*/
  const shouldShowProductResults =
    !isHoneyGuideActive && !isPending && !isError && (data?.length ?? 0) > 0;

  /* Данный которые мы передаем ниже */
  const productsToDisplay = isHoneyGuideActive
    ? recommendedProducts
    : paginatedData;

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
        openHoneyGuid={handleOpenHoneyGuid}
        isHoneyGuideActive={isHoneyGuideActive}
        shouldShowProductResults={shouldShowProductResults}
      />
      <div className={styles.productSection}>
        <div>
          <ErrorBoundary>
            <ProductContent
              products={{
                data: productsToDisplay,
                bestSellerIds: bestSeller ?? [],
              }}
              query={{
                isPending,
                isError,
                error,
                onRetry: refetch,
              }}
              reviews={{
                reviewSummary,
                isPendingReview,
                isErrorReview,
              }}
              viewMode={viewMode}
              honeyGuide={{
                isHoneyGuideActive,
                honeyGuideAttributes: honeyGuideAttributes ?? undefined,
              }}
              onBackToProducts={handleBackToProducts}
            />
          </ErrorBoundary>

          {!isHoneyGuideActive && (
            <div className={styles.pagination}>
              <ProductPagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={onPageChange}
                shouldShowProductResults={shouldShowProductResults}
              />
            </div>
          )}
        </div>
      </div>

      {activeOverlay === 'filter' && (
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

      {activeOverlay === 'guid' && (
        <ResultModal
          title={
            <p
              style={{
                color: '#d9a441',
                textAlign: 'center',
                fontSize: '24px',
              }}>
              {t('guid')}
            </p>
          }
          open={honeyGuideOpen}
          onClose={() => {
            setHoneyGuideOpen(false);
            setActiveOverlay(null);
          }}
          closable>
          <HoneyGuide onFind={handleHoneyGuideFind} />
        </ResultModal>
      )}
    </>
  );
};
