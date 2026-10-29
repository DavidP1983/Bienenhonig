import { Rate } from "antd";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useTranslations } from "next-intl";
import type { Review } from "../model/type";

import styles from "./ReviewsList.module.scss";

dayjs.extend(utc);
dayjs.extend(timezone);

type ReviewsListProps = {
  reviews: Review[];
};

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const t = useTranslations("ProductReview");

  if (reviews.length === 0) {
    return (
      <div className={styles.noReview}>
        <p>{t("noReview")}</p>
      </div>
    );
  }
  return (
    <div className={styles.reviewList}>
      <ul className={styles.list}>
        {reviews.map((review) => {
          const date = dayjs.utc(review.createdAt).local().format("YYYY-MM-DD");

          return (
            <li key={review._id}>
              <article className={styles.card}>
                <header className={styles.header}>
                  <div className={styles.author}>
                    {review.name}{" "}
                    <time dateTime={dayjs(review.createdAt).toISOString()}>
                      {date}
                    </time>
                  </div>
                  <div className={styles.city}>{review.city}</div>
                  <time
                    className={styles.date}
                    dateTime={dayjs(review.createdAt).toISOString()}
                  >
                    {date}
                  </time>
                </header>
                <div className={styles.rating}>
                  <Rate allowHalf count={5} value={review.rating} disabled />
                </div>
                <h3 className={styles.reviewTitle}>{review.title}</h3>
                <p className={styles.comment}>{review.comment}</p>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
