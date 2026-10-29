import { FaGripHorizontal, FaList } from '@/shared/assets/icons';
import type { ViewMode } from './Products';

import styles from './ProductViewToggle.module.scss';

type ProductViewToggleProps = {
  viewMode: ViewMode;
  onChangeViewMode: (view: ViewMode) => void;
};

export const ProductViewToggle = ({
  viewMode,
  onChangeViewMode,
}: ProductViewToggleProps) => {
  return (
    <div className={styles.viewToggle}>
      <button
        type="button"
        aria-label="Grid view"
        aria-pressed={viewMode === 'grid'}
        onClick={() => onChangeViewMode('grid')}>
        <FaGripHorizontal />
      </button>

      <button
        type="button"
        aria-label="List view"
        aria-pressed={viewMode === 'list'}
        onClick={() => onChangeViewMode('list')}>
        <FaList />
      </button>
    </div>
  );
};
