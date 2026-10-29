import { useFilter } from '@/features/product-filters/model';
import { getApiErrorCode } from '@/shared/errors/getApiErrorCode';
import { SkeletonJSX } from '@/shared/ui';
import { ErrorState } from '@/shared/ui/ErrorState';
import type { GetProp } from 'antd';
import { Checkbox } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { useCategories } from '../model/useCategory';

import styles from './Categories.module.scss';

type Locale = 'en' | 'ru';

export const Categories = () => {
  const t = useTranslations('ProductFilter');
  const locale = useLocale() as Locale;

  const { data, isPending, isError, error, refetch } = useCategories();
  const { handleSelect, filter } = useFilter(
    useShallow((state) => ({
      handleSelect: state.handleSelect,
      filter: state.filter.checkbox,
    }))
  );

  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    handleSelect('checkbox', checkedValues as string[]);
  };

  if (isPending) {
    return (
      <div className={styles.category}>
        <SkeletonJSX
          length={5}
          title="60%"
          rows={1}
          width="90%"
        />
      </div>
    );
  }
  if (isError) {
    return (
      <ErrorState
        onRetry={refetch}
        variant="compact"
        error={error}
        errorCode={getApiErrorCode(error)}
      />
    );
  }
  if (!data.length) {
    return <p className={styles.notfound}>{t('notfoundCategory')}</p>;
  }

  return (
    <Checkbox.Group
      className={styles.category}
      onChange={onChange}
      value={filter}>
      {data?.map((category) => (
        <div
          key={category._id}
          className={styles.category__group}>
          <Checkbox
            className={styles.category__item}
            value={category._id}>
            {category.name[locale]}
          </Checkbox>
        </div>
      ))}
    </Checkbox.Group>
  );
};
