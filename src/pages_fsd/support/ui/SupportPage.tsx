'use client';
import { SupportContactForm } from '@/features/support-contact/ui';
import type { TCategory } from '@/widgets/Support/model/types';
import {
  SupportCategories,
  SupportFAQ,
  SupportHero,
} from '@/widgets/Support/ui';
import { useRef, useState } from 'react';

import styles from './Support.module.scss';

export const SupportPage = () => {
  const [activeCategory, setActiveCategory] = useState<TCategory>('orders');
  const faqRef = useRef<HTMLDivElement>(null);

  const handleChangeCategory = (id: TCategory) => {
    if (id === activeCategory) return;
    setActiveCategory(id);

    faqRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      aria-labelledby="support-page"
      className={styles.support}>
      <div className="container">
        <SupportHero />
        <SupportCategories
          activeCategory={activeCategory}
          onCategoryChange={handleChangeCategory}
        />
        <div className={styles.divider}></div>
        <div className={styles.formFqa}>
          <SupportContactForm />
          <div
            ref={faqRef}
            className={styles.faqAnchor}
            id="faq">
            <SupportFAQ activeCategory={activeCategory} />
          </div>
        </div>
      </div>
    </section>
  );
};
