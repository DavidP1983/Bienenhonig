"use client";
import { Modal } from "antd";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";

import styles from "./ReviewCreateModal.module.scss";

type ReviewCreateModalProps = {
  productId: string;
  resetChangePage?: () => void;
};

const Form = dynamic(() =>
  import("./ReviewCreateForm").then((mod) => mod.ReviewCreateForm),
);

export const ReviewCreateModal = ({
  productId,
  resetChangePage,
}: ReviewCreateModalProps) => {
  const t = useTranslations("ProductReview");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Modal
        title={t("titleForm")}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
        classNames={{
          header: `${styles.modalTitle}`,
          wrapper: `${styles.modalWrapper}`,
        }}
      >
        <Form
          productId={productId}
          onCancel={closeModal}
          onReviewCreated={resetChangePage}
        />
      </Modal>

      <button
        type="button"
        className={`btn ${styles.modalBtn}`}
        onClick={() => setIsModalOpen(true)}
      >
        {t("addComment")}
      </button>
    </>
  );
};
