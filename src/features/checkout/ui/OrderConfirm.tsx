'use client';
import { useCartOrder } from '@/entities/cart';
import type { ICartOrder } from '@/entities/cart/model/types';
import { useDelivery } from '@/entities/delivery/model/useDelivery';
import { useRouter } from '@/i18n/navigation';
import sadBee from '@/shared/assets/img/error/sadBee.png';
import { calculateOrderSummary } from '@/shared/lib';
import {
  OrderSummary,
  PurchaseItem,
  ReusableDrawer,
  UndoNotification,
} from '@/shared/ui';
import { Button } from '@/shared/ui/Button';
import { message } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useUndoDelete } from '../model/useUndoDelete';

import styles from './OrderConfirm.module.scss';

interface OrderConfirmProps {
  open: boolean;
  onClose: () => void;
}

export const OrderConfirm = ({ open, onClose }: OrderConfirmProps) => {
  const t = useTranslations('OrderConfirmation');

  const router = useRouter();

  const { data, isPending, isError, refetch } = useDelivery();

  const { cartOrder, removeOrder } = useCartOrder(
    useShallow((state) => ({
      cartOrder: state.cartOrder,
      removeOrder: state.removeOrder,
    }))
  );

  const {
    visibleCartOrder,
    pendingDeletes,
    handleUndo,
    handleRemoveOrder,
    handleComplete,
  } = useUndoDelete({ cartOrder, removeOrder });

  /* Эффект для вызова сообщения */
  useEffect(() => {
    if (!pendingDeletes.length) {
      message.destroy('undo-key');
      return;
    }

    message.open({
      key: 'undo-key',
      className: styles.messageUndo,
      content: (
        <UndoNotification
          undoBtnText={t('undo')}
          text={t('itemRemoved', { count: pendingDeletes.length })}
          resetKey={pendingDeletes.length}
          onUndo={handleUndo}
          onComplete={handleComplete}
        />
      ),
      duration: 0,
    });
  }, [pendingDeletes.length, message, handleUndo, handleComplete, t]);

  /* Расчет итоговой цены, доставки */
  const deliveryPrice = data?.deliveryPrice;
  const { productsTotal, deliveryTotal, grandTotal } = calculateOrderSummary({
    cartOrder: visibleCartOrder,
    deliveryPrice,
  });

  /* Этапы загрузки цены доставки */
  const isDeliveryLoading = isPending;
  const isDeliveryError = isError || deliveryPrice === undefined;
  const disabledBtn =
    !visibleCartOrder.length || isDeliveryLoading || isDeliveryError;

  /* Список заказа */
  const renderOrder = (items: ICartOrder[]) => {
    if (!items.length) {
      return (
        <div className={styles.noData}>
          {t('emptyOrders')}
          <Image
            src={sadBee}
            alt="sadBee"
            width={200}
            height={200}
          />
        </div>
      );
    }
    return (
      <ul className={styles.order}>
        {items.map((item) => (
          <PurchaseItem
            key={item.id}
            item={item}
            onRemove={() => handleRemoveOrder(item.id)}
            confirmRemove
          />
        ))}
      </ul>
    );
  };

  const order = renderOrder(visibleCartOrder);

  return (
    <ReusableDrawer
      title={
        <p>
          {t('title')}
          <br />
          {visibleCartOrder.length
            ? t('cartCount', { count: visibleCartOrder.length })
            : t('cartEmpty')}
        </p>
      }
      open={open}
      onClose={onClose}
      placement="right"
      styles={{
        wrapper: `${styles.drawerContent}`,
        mask: `${styles.drawerMask}`,
        header: `${styles.drawerTitle}`,
        content: `${styles.drawerClose}`,
      }}
      width={500}>
      {order}
      {visibleCartOrder.length > 0 && (
        <OrderSummary
          isPending={isPending}
          isError={isError}
          onRetry={() => refetch()}
          deliveryPrice={deliveryPrice}
          deliveryTotal={deliveryTotal}
          productsTotal={productsTotal}
          grandTotal={grandTotal}
        />
      )}
      {
        <Button
          props={{
            type: 'primary',
            onClick: () => {
              onClose();
              router.push('/checkout');
            },
            disabled: disabledBtn,
          }}
          className={styles.btnConfirmOrder}>
          {t('checkout')}
        </Button>
      }
    </ReusableDrawer>
  );
};
