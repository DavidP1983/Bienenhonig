import {
  FiRefreshCw,
  GoCreditCard,
  GoPackage,
  LuTruck,
} from '@/shared/assets/icons';

export const supportCategories = [
  {
    id: 'orders',
    icon: GoPackage,
    faqId: 'orders',
  },
  {
    id: 'delivery',
    icon: LuTruck,
    faqId: 'delivery',
  },
  {
    id: 'returns',
    icon: FiRefreshCw,
    faqId: 'returns',
  },
  {
    id: 'payments',
    icon: GoCreditCard,
    faqId: 'payments',
  },
] as const;
