import { Categories } from '@/entities/category/ui';
import { useTranslations } from 'next-intl';
import { PriceRangeFilter, SelectFilter } from '.';

import styles from './ProductFilter.module.scss';

export const ProductFilter = () => {
  const t = useTranslations('ProductFilter');

  return (
    <aside className={styles.filters}>
      <section className={styles.filterSection}>
        <h3 className={styles.title}>{t('filterByCategory')}</h3>
        <Categories />
      </section>
      <section className={styles.filterSection}>
        <h3 className={styles.title}>{t('range')}</h3>
        <PriceRangeFilter />
      </section>
      <section className={styles.filterSection}>
        <h3 className={styles.title}>{t('sortBy')}</h3>
        <SelectFilter />
      </section>
    </aside>
  );
};
