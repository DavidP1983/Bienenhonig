import { PurchaseItem } from '@/shared/ui';
import { AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { SelectedItemDescription } from '../model/types';

import styles from './ProductSelectedPurchaseList.module.scss';

type Props = {
  selectedItemsData: SelectedItemDescription[];
  total: number;
  removeItemFromTheList: (size: string) => void;
};

export const ProductSelectedPurchaseList = ({
  selectedItemsData,
  total,
  removeItemFromTheList,
}: Props) => {
  const t = useTranslations('PurchaseItem');

  return (
    <ul className={styles.purchaseItems}>
      <AnimatePresence mode="sync">
        {selectedItemsData.length > 0 &&
          selectedItemsData.map((item) => {
            return (
              <PurchaseItem
                key={item.size}
                item={item}
                onRemove={() => removeItemFromTheList(item.size)}
              />
            );
          })}
      </AnimatePresence>
      <div className={styles.total}>
        <div className={styles.label}>{t('total')}</div>
        <strong>€{total.toFixed(2)}</strong>
      </div>
    </ul>
  );
};
