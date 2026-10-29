import { Categories } from "@/entities/category/ui";
import { useTranslations } from "next-intl";
import { InputSearch, SelectFilter } from ".";

import styles from "./ProductFilter.module.scss";

type ProductFilterProps = {
  className?: string;
};

export const ProductFilter = ({ className }: ProductFilterProps) => {
  const t = useTranslations("ProductFilter");

  return (
    <aside className={`${styles.filters} ${className ?? ""}`}>
      <div className={styles.title}>{t("searchByArticle")}</div>
      <InputSearch />
      <div className={styles.divider}></div>
      <div className={styles.title}>{t("filterByCategory")}</div>
      <Categories />
      <div className={styles.divider}></div>
      <div className={styles.title}>{t("sortBy")}</div>
      <SelectFilter />
    </aside>
  );
};
