export const wishlistKeys = {
  all: ['wishlist'] as const,
  products: (productIds: string[]) =>
    [...wishlistKeys.all, 'products', productIds] as const,
};
