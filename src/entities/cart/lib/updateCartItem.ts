import { getVariantPrice } from '@/entities/product/lib';
import type { ICartOrder } from '../model/types';

export const updateCartItem = (
  existingItem: ICartOrder,
  newItem: ICartOrder
): ICartOrder => {
  const quantity = existingItem.quantity + newItem.quantity;

  const { discountDesc, quantityPrice, totalPrice } = getVariantPrice(
    existingItem.variant,
    quantity
  );

  return {
    ...existingItem,
    quantity,
    discountDesc,
    quantityPrice,
    totalPrice,
  };
};
