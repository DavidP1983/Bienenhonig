import { Select, Space } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useTranslations } from 'next-intl';
import { useFilter } from '../model';

import styles from './SelectFilter.module.scss';

export const SelectFilter = () => {
  const t = useTranslations('ProductFilter');

  const handleSelect = useFilter((state) => state.handleSelect);

  const handleChange = (value: string, option?: DefaultOptionType) => {
    handleSelect(option?.title as string, value);
  };

  return (
    <div className={styles.selectFilter}>
      <Space className={styles.selectContainer}>
        <Select
          className={styles.select}
          defaultValue={t('sortPlaceholder')}
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
              label: t('sortPriceLowHigh'),
              title: 'select',
            },
            {
              value: 'H-L',
              label: t('sortPriceHighLow'),
              title: 'select',
            },
          ]}
          placeholder={t('sortPlaceholder')}
        />
      </Space>
    </div>
  );
};
