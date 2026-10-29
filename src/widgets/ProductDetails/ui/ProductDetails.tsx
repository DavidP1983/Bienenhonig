"use client";
import { useProductById } from "@/entities/product/model/useProductById";
import { useReviewsByProduct } from "@/entities/review/model/useReviewsByProduct";
import { ProductDetailsProps } from "@/pages_fsd/product-details/ui/ProductDetailsPage";
import { Breadcrumbs } from "@/shared/ui";
import { useEffect, useState } from "react";
import { ProductDetailsView } from "./ProductDetailsView";
import { ProductReview } from "./ProductReviews";

import styles from "./ProductDetails.module.scss";

export const ProductDetails = ({ id, size }: ProductDetailsProps) => {
  const [reviewsPage, setReviewsPage] = useState(1);
  const { data, isPending, isError, error, refetch } = useProductById(id, size);

  /*Getting data reviews and Server Pagination*/
  const {
    data: reviews,
    isPending: isReviewsPending,
    isError: isReviewsError,
    error: reviewsError,
  } = useReviewsByProduct(id, reviewsPage);

  /*Для прокрутки страницы к ReviewsSection*/
  useEffect(() => {
    if (window.location.hash !== "#reviews") return;

    if (isPending || isReviewsPending) return;

    const element = document.getElementById("reviews");
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [isPending, isReviewsPending, data, reviews]);

  const handleReviewCreated = () => {
    setReviewsPage(1);
  };

  return (
    <>
      <h1 className="title" id="product-details">
        {data?.title ?? ""}
      </h1>
      <div className={styles.breadcrumb}>
        <Breadcrumbs title={data?.title} />
      </div>
      <ProductDetailsView
        data={data}
        isPending={isPending}
        isError={isError}
        error={error}
        onRetry={refetch}
        size={size}
      />

      <ProductReview
        data={reviews}
        isPending={isReviewsPending}
        isError={isReviewsError}
        error={reviewsError}
        onPageChange={setReviewsPage}
        resetChangePage={handleReviewCreated}
        productId={id}
      />
    </>
  );
};
