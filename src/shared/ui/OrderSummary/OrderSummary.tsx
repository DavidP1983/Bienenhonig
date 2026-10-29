import { IoAlertCircleOutline } from "@/shared/assets/icons";
import { Spin } from "antd";
import { useTranslations } from "next-intl";
import { Button } from "..";

import styles from "./OrderSummary.module.scss";

type DeliverySummaryProps = {
  isPending: boolean;
  isError: boolean;
  deliveryPrice: number | undefined;
  productsTotal: number;
  deliveryTotal: number | undefined;
  grandTotal: number | undefined;
  onRetry: () => void;
};

export const OrderSummary = ({
  isPending,
  isError,
  onRetry,
  productsTotal,
  deliveryTotal,
  grandTotal,
  deliveryPrice,
}: DeliverySummaryProps) => {
  const t = useTranslations("OrderConfirmation");

  if (isPending) {
    return (
      <div className={styles.spinner}>
        <p>{t("calculating")}</p>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || deliveryPrice === undefined) {
    return (
      <div className={styles.totalError}>
        <IoAlertCircleOutline />
        <p>{t("calculationError")}</p>
        <Button
          props={{
            type: "default",
            onClick: onRetry,
          }}
        >
          {t("tryAgain")}
        </Button>
      </div>
    );
  }

  if (
    deliveryPrice === undefined ||
    deliveryTotal === undefined ||
    grandTotal === undefined
  ) {
    return null;
  }

  return (
    <div className={styles.total}>
      <div>
        <span className={styles.label}>{t("subtotal")}</span>
        <strong>€{productsTotal.toFixed(2)}</strong>
      </div>

      <div>
        <span className={styles.label}>{t("shipping")}</span>
        <strong>€{deliveryTotal!.toFixed(2)}</strong>
      </div>

      <div>
        <span className={styles.label}>{t("total")}</span>
        <strong>€{grandTotal!.toFixed(2)}</strong>
      </div>
    </div>
  );
};
