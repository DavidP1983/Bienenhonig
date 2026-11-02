import { BsSliders2 } from '@/shared/assets/icons';
import { Button } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import type { ViewMode } from '../model/types';
import { ProductViewToggle } from './ProductViewToggle';

import styles from './ProductsToolBar.module.scss';

type ProductToolBarProps = {
  page: number;
  pageSize: number;
  total: number;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  openMobileFilters: () => void;
};

export const ProductToolBar = ({
  page,
  pageSize,
  total,
  openMobileFilters,
  onChangeViewMode,
  viewMode,
}: ProductToolBarProps) => {
  const t = useTranslations('Products');

  const showingItems = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingPerPage = Math.min(page * pageSize, total);

  return (
    <div className={styles.toolBar}>
      <p className={styles.toolBar__totalItemPerPage}>
        {t('showingItems', {
          showingItems,
          showingPerPage,
          total,
        })}
      </p>
      <div className={styles.toolBar__controller}>
        <ProductViewToggle
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />
        <div className={styles.toolBar__mobileFilter}>
          <Button
            className={styles.toolBar__btn}
            icon={<BsSliders2 className={styles.toolBar__icon} />}
            props={{
              type: 'default',
              onClick: openMobileFilters,
            }}>
            {t('filter')}
          </Button>
        </div>
      </div>
    </div>
  );
};
