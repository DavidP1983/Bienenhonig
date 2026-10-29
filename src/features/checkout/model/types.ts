export interface CheckoutFormValues {
  name: string;
  surname: string;
  email: string;
  phone?: string;
  address: {
    country: string;
    city: string;
    street: string;
    apartment?: string;
    postalCode?: string;
  };
  comment?: string;
}

export interface CreateOrderPayload {
  customer: CheckoutFormValues;
  items: {
    productId: string;
    size: string;
    quantity: number;
  }[];
}

export interface CreateOrderResponse {
  message: string;
  orderNumber: string;
}
