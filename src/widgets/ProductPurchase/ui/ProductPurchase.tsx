'use client';
import { useCartOrder } from '@/entities/cart';
import { getVariantPrice } from '@/entities/product/lib';
import type { Product } from '@/entities/product/model/types';
import { PiShoppingCart } from '@/shared/assets/icons';
import { Button, ProductUnavailable } from '@/shared/ui';
import { message } from 'antd';
import { useTranslations } from 'next-intl';
import { getSelectedItemsData } from '../model/getSelectedItemsData';
import { useProductPurchase } from '../model/useProductPurchase';
import { ProductSelectedPurchaseList } from './ProductSelectedPurchaseList';

import styles from './ProductPurchase.module.scss';

export type ProductPurchaseProps = {
  data: Product;
  size?: string;
};

export const ProductPurchase = ({ data, size }: ProductPurchaseProps) => {
  const t = useTranslations('ProductPurchase');

  const filteredVariants = data.variants.filter(
    (variant) => variant.quantity > 0
  );
  const {
    selectedVariant,
    quantity,
    handleVariantChange,
    selectedItems,
    decrement,
    increment,
    removeItemFromTheList,
    removeAllItemsAfterAddToCart,
  } = useProductPurchase(filteredVariants, size);

  const { items: selectedItemsData, total } = getSelectedItemsData(
    data,
    selectedItems
  );

  const getCartOrder = useCartOrder((state) => state.getCartOrder);

  if (!selectedVariant) {
    return <ProductUnavailable />;
  }

  const handleAddToCart = () => {
    if (!selectedItemsData.length) {
      message.error(t('emptySelection'));
      return;
    }

    const cartItems = selectedItemsData.map((item) => ({
      ...item,
      id: crypto.randomUUID(),
      productId: data._id,
      sellerId: data.sellerId,
      seller: data.sellerName,
      image: data.images[0] ?? '',
      title: data.title,
    }));

    getCartOrder(cartItems);
    message.success('Products added to cart');
    removeAllItemsAfterAddToCart();
  };

  const renderVariantButtons = (data: Product) => {
    return data.variants.map((variant) => {
      const isOutOfStock = variant.quantity <= 0;

      const isSelected =
        selectedVariant.size === variant.size ? styles.active : '';

      const stockText = isOutOfStock ? t('outOfStock') : t('inStock');

      const stockStyle = isOutOfStock ? styles.outStock : styles.inStock;

      const { originalPrice, originalPriceWithDiscount, discountDesc } =
        getVariantPrice(variant, quantity);

      return (
        <div
          className={styles.desc}
          key={variant.size}>
          <button
            key={variant.size}
            type="button"
            disabled={isOutOfStock}
            className={`${styles.size} ${isSelected}`}
            onClick={() => handleVariantChange(variant.size)}>
            {variant.size}
            <span className={`${styles.stock} ${stockStyle}`}>{stockText}</span>
          </button>

          <div className={styles.price}>
            {discountDesc.discount > 0 ? (
              <>
                {discountDesc.discountType === 'quantity' ? (
                  <>
                    <strong className={styles.originalPrice}>
                      €{originalPrice.toFixed(2)}
                    </strong>
                    <span className={styles.quantityDiscount}>
                      {t('quantityDiscount', {
                        discount: discountDesc.discount,
                        minQuantity: variant.quantityDiscount?.minQuantity ?? 3,
                      })}
                    </span>
                  </>
                ) : (
                  <>
                    <strong className={styles.priceDiscount}>
                      €{originalPriceWithDiscount.toFixed(2)}
                    </strong>
                    <div className={styles.discountDesc}>
                      <del> €{originalPrice.toFixed(2)}</del>
                      <span>−{discountDesc.discount}%</span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <strong className={styles.originalPrice}>
                €{originalPrice.toFixed(2)}
              </strong>
            )}
          </div>
        </div>
      );
    });
  };

  const btnOption = renderVariantButtons(data);

  return (
    <div className={styles.productPurchase}>
      <h2 className={`title ${styles.productPurchase__title}`}>{data.title}</h2>

      <div className={styles.productPurchase__select}>
        {t('selectSizeAndQnt')}
      </div>

      <div className={styles.productPurchase__btn}>{btnOption}</div>

      <div className={styles.productPurchase__quantityControls}>
        <div className={styles.label}>{t('quantity')}</div>
        <div className={styles.control}>
          <button
            type="button"
            aria-label="Decrease quantity"
            className={styles.min}
            onClick={decrement}
            disabled={quantity <= 1}>
            -
          </button>

          <input
            inputMode="text"
            className={styles.counter}
            value={quantity}
            readOnly
            aria-label="Quantity"
          />

          <button
            type="button"
            aria-label="Increase quantity"
            className={styles.max}
            onClick={increment}
            disabled={quantity >= selectedVariant.quantity}>
            +
          </button>
        </div>
      </div>

      <div className={styles.divider}></div>

      <h3 className={styles.notice}>
        {t('selectedVariants')} ({selectedItemsData.length})
      </h3>

      <ProductSelectedPurchaseList
        selectedItemsData={selectedItemsData}
        total={total}
        removeItemFromTheList={removeItemFromTheList}
      />

      <Button
        icon={<PiShoppingCart />}
        props={{
          type: 'primary',
          disabled:
            selectedVariant.quantity <= 0 || !Boolean(selectedItemsData.length),
          onClick: handleAddToCart,
        }}
        className={styles.addToCart}>
        {t('addToCart')}
      </Button>
    </div>
  );
};
