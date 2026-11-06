import type { CloudinaryImage } from '@/shared/types/types';
import { EmblaOptionsType } from 'embla-carousel';

const SLIDES: CloudinaryImage[] = [
  {
    provider: 'cloudinary',
    publicId: 'honey_vjmnw6',
    format: 'jpg',
    alt: 'honey wildflower-honey',
  },
  {
    provider: 'cloudinary',
    publicId: 'products_cu4m6d',
    format: 'jpg',
    alt: 'honey-product',
  },
  {
    provider: 'cloudinary',
    publicId: 'beeProducts_edss61',
    format: 'jpg',
    alt: 'bee-products',
  },
  {
    provider: 'cloudinary',
    publicId: 'beekeeping2_w7ajur',
    format: 'jpg',
    alt: 'beekeeping',
  },
  {
    provider: 'cloudinary',
    publicId: 'honey3_bjtatb',
    format: 'jpg',
    alt: 'honey wildflower-lind',
  },
];

const OPTIONS: EmblaOptionsType = {};
export { OPTIONS, SLIDES };
