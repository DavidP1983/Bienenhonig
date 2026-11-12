import type { Category } from '@/entities/category/model/type';
import { useCategories } from '@/entities/category/model/useCategory';
import { Button } from '@/shared/ui';
import { Tag } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useFilter } from '..';

type Locale = 'en' | 'ru';

import styles from './AppliedFilterChips.module.scss';

interface CategoryChipsProps {
  categoryIds: string[];
  categories: Category[] | undefined;
  locale: Locale;
  onRemove: (id: string) => void;
}

const CategoryChips = ({
  categoryIds,
  categories,
  locale,
  onRemove,
}: CategoryChipsProps) => (
  <>
    {categoryIds.map((categoryId) => {
      const category = categories?.find((item) => item._id === categoryId);

      return (
        <Tag
          key={categoryId}
          closable
          onClose={() => onRemove(categoryId)}>
          {category?.name[locale] ?? categoryId}
        </Tag>
      );
    })}
  </>
);

interface PriceChipProps {
  minPrice: number | null;
  maxPrice: number | null;
  formatPrice: (price: number) => string;
  onRemove: () => void;
}

const PriceChip = ({
  minPrice,
  maxPrice,
  formatPrice,
  onRemove,
}: PriceChipProps) => (
  <Tag
    closable
    onClose={onRemove}>
    {minPrice !== null && formatPrice(minPrice)}
    {minPrice !== null && maxPrice !== null && ' – '}
    {minPrice === null && '≤ '}
    {maxPrice !== null && formatPrice(maxPrice)}
    {maxPrice === null && ' ≥'}
  </Tag>
);

interface SortChipProps {
  value: string;
  t: ReturnType<typeof useTranslations>;
  onRemove: () => void;
}

const SortChip = ({ value, t, onRemove }: SortChipProps) => {
  const labels: Record<string, string> = {
    alphabetic: t('sortAlphabetic'),
    'L-H': t('sortPriceLowToHigh'),
    'H-L': t('sortPriceHighToLow'),
  };

  return (
    <Tag
      closable
      onClose={onRemove}>
      {labels[value]}
    </Tag>
  );
};

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

  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 2,
      }),
    [locale]
  );
  const formatPrice = (price: number) => numberFormatter.format(price);

  return (
    <div
      className={styles.chips}
      data-empty={!hasActiveFilters}>
      <div className={styles.chips__content}>
        <h2 className={styles.chips__title}>{t('activeFilters')}</h2>
        <div className={styles.chips__list}>
          <CategoryChips
            categoryIds={checkbox}
            categories={categories}
            locale={locale}
            onRemove={removeCategory}
          />

          {hasPriceFilter && (
            <PriceChip
              minPrice={minPrice}
              maxPrice={maxPrice}
              formatPrice={formatPrice}
              onRemove={removePriceRange}
            />
          )}

          {select && (
            <SortChip
              value={select}
              t={t}
              onRemove={removeSort}
            />
          )}
        </div>
        <Button
          className={styles.chips__reset}
          props={{ type: 'link', onClick: clearAllFilters }}>
          {t('reset')}
        </Button>
      </div>
    </div>
  );
};
