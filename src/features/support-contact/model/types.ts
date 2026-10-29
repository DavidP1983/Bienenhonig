export type SupportFormValues = {
  email: string;
  orderNumber: string;
  subject: string;
  comment: string;
};

type emailStatus = "pending" | "sent" | "failed";
type Order = {
  orderNumber: string;
  paymentStatus: number;
  productsTotal: number;
  deliveryTotal: number;
  totalPrice: number;
};

export type SupportValues = {
  ticketNumber: string;
  status: string;
  customerEmailStatus: emailStatus;
  supportEmailStatus: emailStatus;
  order: Order;
  message: string;
};
