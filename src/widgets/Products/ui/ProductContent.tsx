import type { Product } from '@/entities/product/model/types';
import { ProductCard } from '@/entities/product/ui';
import { getApiErrorCode } from '@/shared/errors/getApiErrorCode';
import { Button, ErrorState } from '@/shared/ui';
import { Spin } from 'antd';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import type {
  HoneyGuideProps,
  QueryProps,
  ReviewSummeryProps,
  ViewMode,
} from '../model/types';

import styles from './Products.module.scss';

type Props = {
  products: {
    data: Product[] | undefined;
    bestSellerIds: string[];
  };
  query: QueryProps;
  reviews: ReviewSummeryProps;
  viewMode: ViewMode;
  onBackToProducts: () => void;
  honeyGuide: HoneyGuideProps;
};

export const ProductContent = ({
  products,
  query,
  reviews,
  viewMode,
  onBackToProducts,
  honeyGuide,
}: Props) => {
  const t = useTranslations('ProductCard');

  const { isPending, isError, error, onRetry } = query;
  const { data, bestSellerIds } = products;
  const { reviewSummary } = reviews;
  const { isHoneyGuideActive, honeyGuideAttributes } = honeyGuide;

  /* Выбрал Map который создается один раз и для быстрого поиска карточки и его рейтинга по _id */
  const reviewSummaryMap = useMemo(
    () =>
      new Map(reviewSummary?.map((item) => [item._id.toString(), item]) ?? []),
    [reviewSummary]
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
        {isHoneyGuideActive ? (
          <>
            <h2>{t('noMatching')}</h2>
            <Button
              type="link"
              onClick={onBackToProducts}>
              {t('backToAllProducts')}
            </Button>
          </>
        ) : (
          <h2>{t('noData')}</h2>
        )}
      </div>
    );
  }

  const viewCardMode = viewMode === 'grid' ? styles.grid : styles.list;

  return (
    <>
      {isHoneyGuideActive && (
        <div className={styles.recommendationHeader}>
          <h2>{t('recommended')}</h2>
          <span className={styles.matches}>
            {t('matches', { count: data?.length ?? 0 })}
          </span>

          <Button
            type="link"
            onClick={onBackToProducts}
            className={styles.btn}>
            {t('backToAllProducts')}
          </Button>
        </div>
      )}

      <motion.ul className={viewCardMode}>
        <AnimatePresence
          mode="popLayout"
          initial={false}>
          {data?.map((product, index) => (
            <motion.li
              className={styles.card}
              key={product._id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                opacity: { duration: 0.2, ease: 'easeOut' },
                y: { duration: 0.2, ease: 'easeOut' },
                exit: { duration: 0.15, ease: 'easeIn' },
              }}>
              <ProductCard
                product={product}
                reviewSummary={reviewSummaryMap.get(product._id.toString())}
                viewMode={viewMode}
                isBestSeller={bestSellerIdSet.has(product._id.toString())}
                isPriority={index === 0}
                honeyGuide={{
                  attributes: honeyGuideAttributes,
                  isBestMatch: isHoneyGuideActive && index === 0,
                }}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
};
