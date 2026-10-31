import type { CloudinaryImage } from '../types/types';

export interface NavigationType {
  id: number;
  translationKey: 'home' | 'products' | 'support';
  path: string;
  url: CloudinaryImage;
  subtitleKey: 'homeSubtitle' | 'productsSubtitle' | 'supportSubtitle';
}
