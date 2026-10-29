import type { DiscountDescription, Variants } from "../model/types";

export const getDiscountDescription = (
  variant: Variants,
  quantity: number,
): DiscountDescription => {
  /*проверяем обычную скидку*/
  if (variant.discountPercent > 0) {
    return {
      discount: variant.discountPercent,
      discountType: "regular",
      isActive: true,
    };
  }

  /*Если обычной скидки нет — проверяем скидку за количество выбранного товара*/
  if (variant.quantityDiscount) {
    const { minQuantity, discountPercent } = variant.quantityDiscount;
    return {
      discount: discountPercent,
      discountType: "quantity",
      isActive: quantity >= minQuantity,
    };
  }

  // /*Seller не указал скидки*/
  return {
    discount: 0,
    discountType: null,
    isActive: false,
  };
};
