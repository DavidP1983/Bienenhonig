import { ReviewRating } from '@/shared/ui';
import { Pagination } from 'antd';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import type { Review } from '../model/type';
import { ReviewsList } from './ReviewsList';

import styles from './ReviewsSection.module.scss';

type ReviewsSectionProps = {
  reviews: Review[];
  total: number;
  page: number;
  totalPages: number;
  averageRating: number;
  onPageChange: (page: number) => void;
  children?: ReactNode;
};

export const ReviewsSection = ({
  reviews,
  page,
  totalPages,
  total,
  onPageChange,
  averageRating,
  children,
}: ReviewsSectionProps) => {
  const t = useTranslations('ProductReview');

  return (
    <>
      <div className={styles.reviews__total}>
        <div className={styles.reviews__rating}>
          <div className={styles.reviews__ratingValue}>
            {total > 0 ? averageRating : t('notRated')}
          </div>

          <ReviewRating averageRating={averageRating} />
        </div>

        <div className={styles.reviews__count}>
          {t('totalReviews')} ({total})
        </div>
      </div>
      {children}
      <ReviewsList reviews={reviews} />
      {totalPages > 1 && (
        <Pagination
          className={styles.reviews__pagination}
          current={page}
          total={total}
          pageSize={3}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      )}
    </>
  );
};
