import type {
  DiscountDescription,
  Variants,
} from '@/entities/product/model/types';
import type { CloudinaryImage } from '@/shared/types/types';

export type ICartOrder = {
  id: string;
  productId: string;
  seller: string;
  sellerId: string;
  image: CloudinaryImage[];
  title: string;
  variant: Variants;
  discountDesc: DiscountDescription;
  quantityPrice: number;
  totalPrice: number;
  size: string;
  quantity: number;
};
