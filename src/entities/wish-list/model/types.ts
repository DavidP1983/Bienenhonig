import type { Variants } from '@/entities/product/model/types';
import type { CloudinaryImage } from '@/shared/types/types';

export interface Wishlist {
  _id: string;
  title: string;
  images: CloudinaryImage[];
  variants: Variants[];
}
