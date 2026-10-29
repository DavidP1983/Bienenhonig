import { DiscountDescription, Variants } from '@/entities/product/model/types';

export type ICartOrder = {
  id: string;
  productId: string;
  seller: string;
  sellerId: string;
  image: string;
  title: string;
  variant: Variants;
  discountDesc: DiscountDescription;
  quantityPrice: number;
  totalPrice: number;
  size: string;
  quantity: number;
};
