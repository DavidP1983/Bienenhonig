import type { DiscountDescription, Variants } from '../model/types';

export const getDiscountDescription = (
  variant: Variants,
  quantity: number
): DiscountDescription => {
  /*проверяем обычную скидку*/
  if (variant.discountPercent > 0) {
    return {
      discount: variant.discountPercent,
      discountType: 'regular',
      isActive: true,
    };
  }

  /* Скидка за количество */
  if (variant.quantityDiscount) {
    const { minQuantity, discountPercent } = variant.quantityDiscount;
    const isActive = quantity >= minQuantity;

    return {
      discount: discountPercent,
      discountType: 'quantity',
      isActive: isActive,
    };
  }

  /*Скидки нет*/
  return {
    discount: 0,
    discountType: null,
    isActive: false,
  };
};
