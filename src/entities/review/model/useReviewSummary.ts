import { useQuery } from "@tanstack/react-query";
import { reviewKeys } from "./queryKeys";
import { reviewService } from "./review.service";

export const useReviewSummary = () => {
  return useQuery({
    queryKey: reviewKeys.ratingSummary(),
    queryFn: ({ signal }) => reviewService.getReviewSummary(signal),
  });
};
