import { useCategories } from '@/entities/category/model/useCategory';
import { Tag } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { useFilter } from '..';

type Locale = 'en' | 'ru';

import { Button } from '@/shared/ui';
import styles from './AppliedFilterChips.module.scss';

export const AppliedFilterChips = () => {
  const t = useTranslations('ProductFilter');
  const locale = useLocale() as Locale;

  const { data: categories } = useCategories();

  const {
    filter,
    removeCategory,
    removePriceRange,
    removeSort,
    clearAllFilters,
  } = useFilter(
    useShallow((state) => ({
      filter: state.filter,
      removeCategory: state.removeCategory,
      removePriceRange: state.removePriceRange,
      removeSort: state.removeSort,
      clearAllFilters: state.clearAllFilters,
    }))
  );

  const { checkbox, minPrice, maxPrice, select } = filter;

  const hasPriceFilter = minPrice !== null || maxPrice !== null;
  const hasActiveFilters =
    checkbox.length > 0 || hasPriceFilter || Boolean(select);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
    }).format(price);

  if (!hasActiveFilters) return null;

  return (
    <div className={styles.chips}>
      <h2 className={styles.chips__title}>{t('activeFilters')}</h2>
      <div className={styles.chips__list}>
        {checkbox.map((categoryId) => {
          const category = categories?.find((item) => item._id === categoryId);

          return (
            <Tag
              key={categoryId}
              closable
              onClose={() => removeCategory(categoryId)}>
              {category?.name[locale] ?? categoryId}
            </Tag>
          );
        })}

        {hasPriceFilter && (
          <Tag
            closable
            onClose={removePriceRange}>
            {minPrice !== null && formatPrice(minPrice)}
            {minPrice !== null && maxPrice !== null && ' – '}
            {minPrice === null && '≤ '}
            {maxPrice !== null && formatPrice(maxPrice)}
            {maxPrice === null && ' ≥'}
          </Tag>
        )}

        {select && (
          <Tag
            closable
            onClose={removeSort}>
            {select === 'alphabetic' && t('sortAlphabetic')}
            {select === 'L-H' && t('sortPriceLowToHigh')}
            {select === 'H-L' && t('sortPriceHighToLow')}
          </Tag>
        )}
      </div>
      <Button
        className={styles.chips__reset}
        props={{ type: 'link', onClick: clearAllFilters }}>
        {t('reset')}
      </Button>
    </div>
  );
};
