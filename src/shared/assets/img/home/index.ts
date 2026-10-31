import { CloudinaryImage } from '@/shared/types/types';

export const HomeImages: Record<string, CloudinaryImage> = {
  home: {
    provider: 'cloudinary',
    publicId: 'home-bee-risize_kxakfm',
    format: 'webp',
    alt: 'Home',
  },
  products: {
    provider: 'cloudinary',
    publicId: 'products_nsvkix',
    format: 'webp',
    alt: 'products',
  },
  support: {
    provider: 'cloudinary',
    publicId: 'contacts_d47slg',
    format: 'webp',
    alt: 'support',
  },
  apiary: {
    provider: 'cloudinary',
    publicId: 'passika_1_rxqnst',
    format: 'webp',
    alt: 'apiary',
  },
  propose: {
    provider: 'cloudinary',
    publicId: 'propose_j3ermu',
    format: 'webp',
    alt: 'propose',
  },
};
