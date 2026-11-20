export const backInStockKeys = {
  all: ['backInStock'] as const,
  byProduct: (productId: string) =>
    [...backInStockKeys.all, 'backInStock', productId] as const,
};
