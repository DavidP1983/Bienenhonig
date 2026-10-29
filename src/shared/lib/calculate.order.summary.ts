import type { ICartOrder } from '@/entities/cart/model/types';

interface CalculateOrderSummaryProps {
  cartOrder: ICartOrder[];
  deliveryPrice: number | undefined;
}

export const calculateOrderSummary = ({
  cartOrder,
  deliveryPrice,
}: CalculateOrderSummaryProps) => {
  const productsTotal = cartOrder.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  /* Количество уникальных продавцов */
  const sellersCount = new Set(cartOrder.map((item) => item.sellerId)).size;

  /* Подсчет стоимости доставки исходя из каждого продавца */
  const deliveryTotal =
    deliveryPrice !== undefined ? deliveryPrice * sellersCount : undefined;

  /* Финальная расчет к оплате*/
  const grandTotal =
    deliveryTotal !== undefined ? productsTotal + deliveryTotal : undefined;

  return { productsTotal, sellersCount, deliveryTotal, grandTotal };
};
