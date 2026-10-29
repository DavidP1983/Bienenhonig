import type { Review } from "../model/type";

export const calcRating = (reviews: Review[]) => {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((acc, curr) => acc + curr.rating, 0);

  return Number((total / reviews.length).toFixed(1));
};
