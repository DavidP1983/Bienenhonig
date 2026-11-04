import type { Product } from '@/entities/product/model/types';
import { ProductCard } from '@/entities/product/ui';
import type { ReviewSummery } from '@/entities/review/model/type';
import { getApiErrorCode } from '@/shared/errors/getApiErrorCode';
import { ErrorState } from '@/shared/ui';
import { Spin } from 'antd';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type { ViewMode } from '../model/types';

import styles from './Products.module.scss';

type ReviewSummeryProps = {
  reviewSummery: ReviewSummery[] | undefined;
  isPendingReview: boolean;
  isErrorReview: boolean;
};

type Props = {
  products: {
    data: Product[] | undefined;
    bestSellerIds: string[];
  };
  onRetry?: () => void;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  reviews: ReviewSummeryProps;
  viewMode: ViewMode;
};

export const ProductContent = ({
  products,
  isPending,
  isError,
  onRetry,
  error,
  reviews,
  viewMode,
}: Props) => {
  const t = useTranslations('ProductCard');

  const { data, bestSellerIds } = products;

  /* Выбрал Map который создается один раз и для быстрого поиска карточки и его рейтинга по _id */
  const reviewSummaryMap = useMemo(
    () =>
      new Map(reviews?.reviewSummery?.map((item) => [item._id, item]) ?? []),
    [reviews.reviewSummery]
  );

  const bestSellerIdSet = useMemo(
    () => new Set(bestSellerIds),
    [bestSellerIds]
  );

  if (isPending) {
    return (
      <div className={styles.spinner}>
        <Spin
          tip="Loading"
          size="large"
        />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="productsError">
        <ErrorState
          onRetry={onRetry}
          error={error}
          errorCode={getApiErrorCode(error)}
          showAction
        />
      </div>
    );
  }
  if (!data?.length) {
    return (
      <div className={styles.noData}>
        <h2>{t('noData')}</h2>
      </div>
    );
  }

  const viewCardMode = viewMode === 'grid' ? styles.grid : styles.list;
  return (
    <motion.ul className={viewCardMode}>
      <AnimatePresence mode="popLayout">
        {data?.map((product) => (
          <motion.li
            className={styles.card}
            key={product._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              delay: 0,
              layout: { duration: 0.15 },
            }}>
            <ProductCard
              product={product}
              reviewSummary={reviewSummaryMap.get(product._id.toString())}
              viewMode={viewMode}
              isBestSeller={bestSellerIdSet.has(product._id.toString())}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};
