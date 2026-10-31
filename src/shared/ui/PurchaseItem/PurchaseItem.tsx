import type { ICartOrder } from '@/entities/cart/model/types';
import type { SelectedItemDescription } from '@/widgets/ProductPurchase/model/types';
import { Popconfirm } from 'antd';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ProductImage } from '../ProductImage/ProductImage';

import styles from './PurchaseItem.module.scss';

type PurchaseItemProps = {
  item: SelectedItemDescription | ICartOrder;
  onRemove?: () => void;
  confirmRemove?: boolean;
};

export const PurchaseItem = ({
  item,
  onRemove,
  confirmRemove = false,
}: PurchaseItemProps) => {
  const t = useTranslations('PurchaseItem');

  const { discount, discountType, isActive } = item.discountDesc;
  const { variant, size, quantity, totalPrice, quantityPrice } = item;
  const isCartOrder = 'image' in item;

  const showDiscount =
    discount > 0 &&
    (discountType === 'regular' || (discountType === 'quantity' && isActive));

  const discountLabel =
    discountType === 'quantity'
      ? t('quantityDiscount', {
          discount: discount,
          minQuantity: variant.quantityDiscount?.minQuantity ?? 3,
        })
      : t('discount', {
          discount: discount,
        });

  const removeButton = (
    <button
      type="button"
      className={styles.remove}
      aria-label={`Remove variant ${item.size}`}>
      ×
    </button>
  );

  return (
    <motion.li
      className={styles.item}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}>
      <div className={styles.desc}>
        {isCartOrder && (
          <ProductImage
            style={styles.image}
            image={item.image?.[0]}
            width={200}
            height={200}
          />
        )}
        <div className={styles.seller}>
          {isCartOrder && <strong>{item.title}</strong>}
          {isCartOrder && (
            <span>
              {t('seller')}: {item.seller}
            </span>
          )}
        </div>

        <strong>
          {size} × {quantity}
        </strong>

        <div className={styles.units}>
          €{variant.price.toFixed(2)} {t('perUnit')}
        </div>

        {showDiscount && <div className={styles.discount}>{discountLabel}</div>}
      </div>

      <div className={styles.price}>
        <strong>€{totalPrice.toFixed(2)}</strong>

        {discount > 0 && (
          <div className={styles.quantityPrice}>
            {t('was')} €{quantityPrice.toFixed(2)}
          </div>
        )}
      </div>

      {onRemove &&
        (confirmRemove ? (
          <Popconfirm
            placement="topRight"
            title={t('removeConfirmTitle')}
            description={t('removeConfirmDesc')}
            okText={t('okText')}
            cancelText={t('cancelText')}
            onConfirm={onRemove}>
            {removeButton}
          </Popconfirm>
        ) : (
          <button
            type="button"
            className={styles.remove}
            aria-label={`Remove variant ${item.size}`}
            onClick={onRemove}>
            ×
          </button>
        ))}
    </motion.li>
  );
};
