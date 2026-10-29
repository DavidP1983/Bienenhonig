"use client";
import { SupportContactForm } from "@/features/support-contact/ui";
import type { TCategory } from "@/widgets/Support/model/types";
import {
  SupportCategories,
  SupportFAQ,
  SupportHero,
} from "@/widgets/Support/ui";
import { useState } from "react";

import styles from "./Support.module.scss";

export const SupportPage = () => {
  const [activeCategory, setActiveCategory] = useState<TCategory>("orders");

  const handleChangeCategory = (id: TCategory) => {
    setActiveCategory(id);
  };

  return (
    <section aria-labelledby="support-page" className={styles.support}>
      <div className="container">
        <SupportHero />
        <SupportCategories
          activeCategory={activeCategory}
          onCategoryChange={handleChangeCategory}
        />
        <div className={styles.divider}></div>
        <div className={styles.formFqa}>
          <SupportContactForm />
          <SupportFAQ activeCategory={activeCategory} />
        </div>
      </div>
    </section>
  );
};
