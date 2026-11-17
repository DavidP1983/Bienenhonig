import { Button, ReusableDrawer } from '@/shared/ui';
import type { Styles } from '@/shared/ui/ReusableDrawer/ReusableDrawer';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

type ProductFilterDrawerProps = {
  filterOpen: boolean;
  onClose: () => void;
  clearAllFilters: () => void;
  applyFilter: () => void;
  cancelDraft: () => void;
  styles: Styles;
  children: ReactNode;
  btnStyles: string;
  resultCount: number;
};

export const ProductFilterDrawer = ({
  filterOpen,
  onClose,
  clearAllFilters,
  applyFilter,
  cancelDraft,
  styles,
  children,
  btnStyles,
  resultCount,
}: ProductFilterDrawerProps) => {
  const t = useTranslations('ProductFilter');

  return (
    <ReusableDrawer
      title={<p>{t('title')}</p>}
      open={filterOpen}
      onClose={() => {
        cancelDraft();
        onClose();
      }}
      placement="right"
      width={500}
      styles={styles}>
      {children}
      <div className={btnStyles}>
        <Button
          props={{
            type: 'default',
            onClick: clearAllFilters,
          }}>
          {t('reset')}
        </Button>
        <Button
          props={{
            type: 'primary',
            onClick: () => {
              applyFilter();
              onClose();
            },
          }}>
          {t('apply', { count: resultCount })}
        </Button>
        <p>{t('showResults', { count: resultCount })}</p>
      </div>
    </ReusableDrawer>
  );
};
