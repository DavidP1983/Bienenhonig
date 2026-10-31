import { HomeImages } from '@/shared/assets/img/home';
import type { NavigationType } from './types';

export const navigation: NavigationType[] = [
  {
    id: 1,
    translationKey: 'home',
    path: '/',
    url: HomeImages.home,
    subtitleKey: 'homeSubtitle',
  },
  {
    id: 2,
    translationKey: 'products',
    path: '/products',
    url: HomeImages.products,
    subtitleKey: 'productsSubtitle',
  },
  {
    id: 3,
    translationKey: 'support',
    path: '/support',
    url: HomeImages.support,
    subtitleKey: 'supportSubtitle',
  },
];
