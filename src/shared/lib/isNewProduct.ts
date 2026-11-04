const NEW_PRODUCT_DAYS = 7;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const isNewProduct = (createdAt: Date): boolean => {
  const createdAtTime = new Date(createdAt).getTime();
  const now = Date.now();

  if (Number.isNaN(createdAtTime)) return false;

  const age = now - createdAtTime;

  return age >= 0 && age <= NEW_PRODUCT_DAYS * DAY_IN_MS;
};
