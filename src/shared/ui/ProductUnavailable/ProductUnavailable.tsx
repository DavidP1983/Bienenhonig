import { IoAlertCircleOutline, LuPackageX } from "@/shared/assets/icons";
import { useTranslations } from "next-intl";

import styles from "./ProductUnavailable.module.scss";

interface ProductUnavailableProps {
  title?: string;
  description?: string;
}

export const ProductUnavailable = ({
  title = "unavailableTitle",
  description = "unavailableDescription",
}: ProductUnavailableProps) => {
  const t = useTranslations("ProductPurchase");
  const titleKey = t(title);
  const descriptionKey = t(description);

  return (
    <div className={styles.unavailable}>
      <div className={styles.unavailable__title}>
        <div className={styles.unavailable__alert}>
          <LuPackageX
            aria-hidden={true}
            className={styles.unavailable__package}
          />
        </div>
        <h3 className={`title ${styles.unavailable__announcement}`}>
          {titleKey}
        </h3>
      </div>
      <p className={styles.unavailable__desc}>{descriptionKey}</p>
      <div className={styles.unavailable__suggestion}>
        <div className={styles.unavailable__icon}>
          <IoAlertCircleOutline className={styles.unavailable__alertCircle} />
          <span className={styles.unavailable__propose}>{t("propose")}</span>
        </div>
        <span className={styles.unavailable__try}>{t("try")}</span>
      </div>
    </div>
  );
};
