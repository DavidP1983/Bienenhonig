import { CloudinaryImage } from '@/shared/types/types';

type Description = {
  producer: string;
  color: string;
  origin: string;
  text: string;
};

export type DiscountPercent = 0 | 5 | 10 | 15;
type QuantityDiscount = {
  minQuantity: number;
  discountPercent: Exclude<DiscountPercent, 0>;
};

export type DiscountDescription = {
  discount: number;
  discountType: 'regular' | 'quantity' | null;
  isActive?: boolean;
};

export type Variants = {
  size: string;
  price: number;
  quantity: number;
  discountPercent: DiscountPercent;
  quantityDiscount?: QuantityDiscount;
};

export type SellerContactType = 'facebook' | 'whatsapp' | 'telegram' | 'email';

export interface SellerContact {
  type: SellerContactType;
  value: string;
}

export interface Product {
  _id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  contacts: SellerContact[];
  categoryId: string;
  title: string;
  slug: string;
  description: Description;
  images: CloudinaryImage[];
  variants: Variants[];
  discountPercent: DiscountPercent;
  quantityDiscount?: QuantityDiscount;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// isActive - продавец временно снял товар с продажи.
// slug - удобный уникальный идентификатор для URL
