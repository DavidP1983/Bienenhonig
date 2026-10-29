export const reviewKeys = {
  all: ["reviews"] as const,
  ratingSummary: () => [...reviewKeys.all, "rating-summary"] as const,
  byProduct: (productId: string) =>
    [...reviewKeys.all, "product", productId] as const,
};
