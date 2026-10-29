import { CreateReviewData, reviewApi } from '../api/review.api';

export const reviewService = {
  getReviewSummary: (signal?: AbortSignal) =>
    reviewApi.getReviewRatingSummary(signal),

  getReviewsByProduct: (
    productId: string,
    page = 1,
    limit = 3,
    signal?: AbortSignal
  ) => reviewApi.getReviewsByProduct(productId, page, limit, signal),

  createReview: (data: CreateReviewData) => reviewApi.createReview(data),
};
