import { urls } from '@/shared/assets/img';
import type { NavigationType } from './types';

export const navigation: NavigationType[] = [
  {
    id: 1,
    translationKey: 'home',
    path: '/',
    url: urls.home,
    subtitleKey: 'homeSubtitle',
  },
  {
    id: 2,
    translationKey: 'products',
    path: '/products',
    url: urls.products,
    subtitleKey: 'productsSubtitle',
  },
  {
    id: 3,
    translationKey: 'support',
    path: '/support',
    url: urls.support,
    subtitleKey: 'supportSubtitle',
  },
];
