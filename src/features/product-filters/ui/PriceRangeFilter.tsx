import { InputNumber } from 'antd';
import { useShallow } from 'zustand/react/shallow';
import { useFilter } from '..';

import styles from './PriceRangeFilter.module.scss';

export const PriceRangeFilter = () => {
  const { draft, handleSelect } = useFilter(
    useShallow((state) => ({
      draft: state.draft,
      handleSelect: state.handleSelect,
    }))
  );

  return (
    <div className={styles.range}>
      <InputNumber<number>
        min={0}
        value={draft.minPrice}
        placeholder="From"
        addonAfter="EUR"
        onChange={(value) => handleSelect('minPrice', value)}
      />

      <InputNumber<number>
        min={0}
        value={draft.maxPrice}
        placeholder="To"
        addonAfter="EUR"
        onChange={(value) => handleSelect('maxPrice', value)}
      />
    </div>
  );
};
