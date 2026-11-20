export type TBackInStock = {
  productId: string;
  email: string;
};

export type TBackInStockResponse = {
  productId: string;
  email: string;
  status: 'pending' | 'received';
  createdAt: string;
  notifiedAt: string | null;
};
