import type { ICartOrder } from "@/entities/cart/model/types";
import { SelectedItemDescription } from "@/widgets/ProductPurchase/model/types";
import { Popconfirm } from "antd";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from "./PurchaseItem.module.scss";

type PurchaseItemProps = {
  item: SelectedItemDescription | ICartOrder;
  title?: string;
  image?: string;
  seller?: string;
  onRemove?: () => void;
  confirmRemove?: boolean;
};

export const PurchaseItem = ({
  item,
  onRemove,
  title,
  seller,
  image,
  confirmRemove = false,
}: PurchaseItemProps) => {
  const t = useTranslations("PurchaseItem");

  const { discount, discountType, isActive } = item.discountDesc;
  const { variant, size, quantity, totalPrice, quantityPrice } = item;

  const showDiscount =
    discount > 0 &&
    (discountType === "regular" || (discountType === "quantity" && isActive));

  const discountLabel =
    discountType === "quantity"
      ? t("quantityDiscount", {
          discount: discount,
          minQuantity: variant.quantityDiscount?.minQuantity ?? 3,
        })
      : t("discount", {
          discount: discount,
        });

  const removeButton = (
    <button
      type="button"
      className={styles.remove}
      aria-label={`Remove variant ${item.size}`}
    >
      ×
    </button>
  );

  return (
    <motion.li
      className={styles.item}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <div className={styles.desc}>
        {image && (
          <Image
            src={image}
            alt={title ?? ""}
            width={200}
            height={200}
            className={styles.image}
          />
        )}

        <div className={styles.seller}>
          {title && <strong>{title}</strong>}
          {seller && (
            <span>
              {t("seller")}: {seller}
            </span>
          )}
        </div>

        <strong>
          {size} × {quantity}
        </strong>

        <div className={styles.units}>
          €{variant.price.toFixed(2)} {t("perUnit")}
        </div>

        {showDiscount && <div className={styles.discount}>{discountLabel}</div>}
      </div>

      <div className={styles.price}>
        <strong>€{totalPrice.toFixed(2)}</strong>

        {discount > 0 && (
          <div className={styles.quantityPrice}>
            {t("was")} €{quantityPrice.toFixed(2)}
          </div>
        )}
      </div>

      {onRemove &&
        (confirmRemove ? (
          <Popconfirm
            placement="topRight"
            title={t("removeConfirmTitle")}
            description={t("removeConfirmDesc")}
            okText={t("okText")}
            cancelText={t("cancelText")}
            onConfirm={onRemove}
          >
            {removeButton}
          </Popconfirm>
        ) : (
          <button
            type="button"
            className={styles.remove}
            aria-label={`Remove variant ${item.size}`}
            onClick={onRemove}
          >
            ×
          </button>
        ))}
    </motion.li>
  );
};
