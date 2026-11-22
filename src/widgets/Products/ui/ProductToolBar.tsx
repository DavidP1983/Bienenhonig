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
  openProductFilters: () => void;
  openHoneyGuid: () => void;
  isHoneyGuideActive: boolean;
  shouldShowProductResults: boolean;
};

export const ProductToolBar = ({
  page,
  pageSize,
  total,
  openProductFilters,
  openHoneyGuid,
  onChangeViewMode,
  viewMode,
  isHoneyGuideActive,
  shouldShowProductResults,
}: ProductToolBarProps) => {
  const t = useTranslations('Products');

  const showingItems = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingPerPage = Math.min(page * pageSize, total);

  return (
    <div className={styles.toolBar}>
      <div className={styles.toolBar__controller}>
        <ProductViewToggle
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />
        <div className={styles.toolBar__filter}>
          <Button
            type="default"
            onClick={openProductFilters}
            disabled={isHoneyGuideActive}
            className={styles.toolBar__btn}
            icon={<BsSliders2 className={styles.toolBar__icon} />}>
            {t('filter')}
          </Button>
          <Button
            type="default"
            onClick={openHoneyGuid}
            className={styles.toolBar__btn}
            aria-expanded={isHoneyGuideActive}
            aria-controls="honey-guide-modal">
            {t('guid')}
          </Button>
        </div>
      </div>
      {shouldShowProductResults && (
        <p className={styles.toolBar__totalItemPerPage}>
          {t('showingItems', {
            showingItems,
            showingPerPage,
            total,
          })}
        </p>
      )}
    </div>
  );
};
