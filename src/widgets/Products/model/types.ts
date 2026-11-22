import type { HoneyGuideAttributes } from '@/entities/product/model/types';
import type { ReviewSummery } from '@/entities/review/model/type';

export type ViewMode = 'grid' | 'list';

export type ReviewSummeryProps = {
  reviewSummary: ReviewSummery[] | undefined;
  isPendingReview: boolean;
  isErrorReview: boolean;
};

export type QueryProps = {
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  onRetry?: () => void;
};

export type HoneyGuideProps = {
  isHoneyGuideActive: boolean;
  honeyGuideAttributes: HoneyGuideAttributes | undefined;
};
