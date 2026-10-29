export const productKeys = {
  all: ['products'] as const,
  detail: (id: string, size?: string) =>
    [...productKeys.all, id, { size }] as const,
  related: (id: string, limit: number) =>
    [...productKeys.all, 'related', id, limit] as const,
};
