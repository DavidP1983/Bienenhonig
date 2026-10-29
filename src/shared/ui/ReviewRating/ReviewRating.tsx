import { Rate } from "antd";

import styles from "./ReviewRating.module.scss";

type ReviewsProps = {
  averageRating: number;
};

export const ReviewRating = ({ averageRating }: ReviewsProps) => {
  return (
    <Rate
      allowHalf
      count={5}
      value={averageRating}
      disabled
      className={styles.review}
    />
  );
};
