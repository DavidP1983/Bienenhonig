import { getDiscountDescription } from ".";
import type { DiscountDescription, Variants } from "../model/types";

type VariantPrice = {
  originalPrice: number;
  originalPriceWithDiscount: number;
  quantityPrice: number;
  totalPrice: number;
  discountDesc: DiscountDescription;
};

export const getVariantPrice = (
  variant: Variants,
  quantity: number,
): VariantPrice => {
  const { discount, discountType, isActive } = getDiscountDescription(
    variant,
    quantity,
  );

  const originalPrice = variant.price;
  const originalPriceWithDiscount = originalPrice * (1 - discount / 100);
  const quantityPrice = originalPrice * quantity;
  const totalPrice =
    Math.round((quantityPrice * (1 - discount / 100) + Number.EPSILON) * 100) /
    100;

  return {
    originalPrice,
    originalPriceWithDiscount,
    quantityPrice,
    totalPrice,
    discountDesc: {
      discount,
      discountType,
      isActive,
    },
  };
};
