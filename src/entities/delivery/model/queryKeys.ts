export const deliveryKeys = {
  all: ['delivery'] as const,
  price: () => [...deliveryKeys.all, 'price'] as const,
};
