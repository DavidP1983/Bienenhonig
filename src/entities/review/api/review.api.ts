import { api } from '@/shared/api/client';
import type { Review, ReviewSummery } from '../model/type';

export type CreateReviewData = Pick<
  Review,
  'name' | 'city' | 'title' | 'rating' | 'comment' | 'productId'
>;

export type ReviewsResponse = {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  averageRating: number;
};

export const reviewApi = {
  getReviewRatingSummary: (signal?: AbortSignal) =>
    api.get<ReviewSummery[]>('/api/reviews/ratings', { signal }),

  getReviewsByProduct: (
    productId: string,
    page = 1,
    limit = 3,
    signal?: AbortSignal
  ) =>
    api.get<ReviewsResponse>(
      `/api/reviews?productId=${encodeURIComponent(productId)}&page=${page}&limit=${limit}`,
      { signal }
    ),

  createReview: (data: CreateReviewData) =>
    api.post<Review>('/api/reviews', data),
};

// encodeURIComponent - in case empty space and special symbols "abc 20" -> %20
