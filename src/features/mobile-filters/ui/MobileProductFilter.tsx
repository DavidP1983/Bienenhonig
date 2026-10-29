import { Button, ReusableDrawer } from '@/shared/ui';
import type { Styles } from '@/shared/ui/ReusableDrawer/ReusableDrawer';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

type MobileProductFilterProps = {
  filterOpen: boolean;
  onClose: () => void;
  resetFilter: () => void;
  styles: Styles;
  children: ReactNode;
  btnStyles: string;
  resultCount: number;
};

export const MobileProductFilter = ({
  filterOpen,
  onClose,
  resetFilter,
  styles,
  children,
  btnStyles,
  resultCount,
}: MobileProductFilterProps) => {
  const t = useTranslations('ProductMobileFilter');

  return (
    <ReusableDrawer
      title={<p>{t('title')}</p>}
      open={filterOpen}
      onClose={onClose}
      placement="right"
      width={400}
      styles={styles}>
      {children}
      <div className={btnStyles}>
        <Button
          props={{
            type: 'default',
            onClick: resetFilter,
          }}>
          {t('reset')}
        </Button>
        <Button
          props={{
            type: 'primary',
            onClick: onClose,
          }}>
          {t('showResults', { count: resultCount })}
        </Button>
      </div>
    </ReusableDrawer>
  );
};
