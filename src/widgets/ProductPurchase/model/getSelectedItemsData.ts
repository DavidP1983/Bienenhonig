import { getVariantPrice } from "@/entities/product/lib";
import type { Product } from "@/entities/product/model/types";

type Props = {
  size: string;
  quantity: number;
};

export const getSelectedItemsData = (data: Product, selectedItems: Props[]) => {
  const items = selectedItems.flatMap((item) => {
    const variant = data.variants.find((variant) => variant.size === item.size);

    if (!variant) return [];

    const { discountDesc, quantityPrice, totalPrice } = getVariantPrice(
      variant,
      item.quantity,
    );

    return [
      {
        ...item,
        variant,
        discountDesc,
        quantityPrice,
        totalPrice,
      },
    ];
  });

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return { items, total };
};
