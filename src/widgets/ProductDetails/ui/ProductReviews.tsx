import type { ReviewsResponse } from '@/entities/review/api/review.api';
import { ReviewsSection } from '@/entities/review/ui/ReviewsSection';
import { ReviewCreateModal } from '@/features/review-create/ui';
import { getApiErrorCode } from '@/shared/errors/getApiErrorCode';
import { ErrorState, SkeletonJSX } from '@/shared/ui';
import { useTranslations } from 'next-intl';

import styles from './ProductDetails.module.scss';

type Props = {
  data: ReviewsResponse | undefined;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  onPageChange: (page: number) => void;
  resetChangePage: () => void;
  productId: string;
};

export const ProductReview = ({
  data,
  isPending,
  isError,
  error,
  onPageChange,
  productId,
  resetChangePage,
}: Props) => {
  const t = useTranslations('ProductReview');

  let content;

  if (isPending) {
    content = (
      <SkeletonJSX
        length={1}
        title="25%"
        rows={2}
        width={['100%', '70%']}
      />
    );
  } else if (isError || !data) {
    content = (
      <ErrorState
        error={error}
        errorCode={getApiErrorCode(error)}
        variant="compact"
      />
    );
  } else {
    content = (
      <ReviewsSection
        reviews={data.reviews ?? []}
        total={data.total ?? 0}
        page={data.page}
        totalPages={data.totalPages ?? 0}
        averageRating={data.averageRating ?? 0}
        onPageChange={onPageChange}>
        <ReviewCreateModal
          productId={productId}
          resetChangePage={resetChangePage}
        />
      </ReviewsSection>
    );
  }

  return (
    <div
      id="reviews"
      className={styles.reviewsContainer}>
      <h2 className={`title ${styles.reviewsContainer__title}`}>
        {t('title')}
      </h2>
      {content}
    </div>
  );
};
