'use client';
import { useCartOrder } from '@/entities/cart';
import type { ICartOrder } from '@/entities/cart/model/types';
import { useDelivery } from '@/entities/delivery/model/useDelivery';
import { CheckoutForm } from '@/features/checkout';
import { calculateOrderSummary } from '@/shared/lib';
import { OrderSummary, PurchaseItem } from '@/shared/ui';
import { useTranslations } from 'next-intl';

import styles from './CheckoutPage.module.scss';

export const CheckoutPage = () => {
  const t = useTranslations('CheckoutPage');

  const { data, isPending, isError, refetch } = useDelivery();

  const cartOrder = useCartOrder((state) => state.cartOrder);
  const hasHydrated = useCartOrder((state) => state.hasHydrated);

  const deliveryPrice = data?.deliveryPrice;
  const { productsTotal, deliveryTotal, grandTotal } = calculateOrderSummary({
    cartOrder,
    deliveryPrice,
  });

  const renderSummary = (cartOrder: ICartOrder[]) => {
    if (!hasHydrated) {
      return <p className={styles.loading}>{t('loading')}</p>;
    }

    if (cartOrder.length === 0) {
      return <div className={styles.noData}>{t('submitted')}</div>;
    }
    return (
      <>
        <ul className={styles.order}>
          {cartOrder &&
            cartOrder.map((item) => (
              <PurchaseItem
                key={item.id}
                item={item}
                confirmRemove={false}
              />
            ))}
        </ul>
      </>
    );
  };

  const summary = renderSummary(cartOrder);

  return (
    <section
      className={styles.checkout}
      aria-labelledby="checkout">
      <div className="container">
        <h1
          id="checkout"
          className={`title ${styles.checkout__title}`}>
          {t('title')}
        </h1>
        <p className={styles.checkout__details}>{t('details')}</p>
        <div className={styles.checkout__blocks}>
          <div className={styles.shipping}>
            <h2 className={styles.subTitle}>{t('shippingDetails')}</h2>
            <CheckoutForm />
          </div>
          <div className={styles.summery}>
            <h2 className={styles.subTitle}>{t('orderSummary')}</h2>
            <div className={styles.items}>
              {summary}
              {cartOrder.length > 0 && (
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
