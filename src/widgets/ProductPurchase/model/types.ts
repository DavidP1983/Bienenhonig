import { DiscountDescription, Variants } from '@/entities/product/model/types';

export type SelectedItemDescription = {
  variant: Variants;
  discountDesc: DiscountDescription;
  quantityPrice: number;
  totalPrice: number;
  size: string;
  quantity: number;
};
