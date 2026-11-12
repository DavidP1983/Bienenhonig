import { Select, Space } from 'antd';
import { useTranslations } from 'next-intl';
import { useShallow } from 'zustand/react/shallow';
import { useFilter } from '../model';
import type { DraftFilter } from '../model/types';

import styles from './SelectFilter.module.scss';

export const SelectFilter = () => {
  const t = useTranslations('ProductFilter');

  const { draft, handleSelect } = useFilter(
    useShallow((state) => ({
      draft: state.draft.select,
      handleSelect: state.handleSelect,
    }))
  );

  const handleChange = (value: DraftFilter['select']) => {
    handleSelect('select', value);
  };

  return (
    <div className={styles.selectFilter}>
      <Space className={styles.selectContainer}>
        <Select
          className={styles.select}
          placeholder={t('sortPlaceholder')}
          value={draft || undefined}
          onChange={handleChange}
          allowClear
          title="select"
          aria-label={t('sortAriaLabel')}
          options={[
            {
              value: 'alphabetic',
              label: t('sortAlphabetic'),
              title: 'select',
            },
            {
              value: 'L-H',
              label: t('sortPriceLowToHigh'),
              title: 'select',
            },
            {
              value: 'H-L',
              label: t('sortPriceHighToLow'),
              title: 'select',
            },
          ]}
        />
      </Space>
    </div>
  );
};
