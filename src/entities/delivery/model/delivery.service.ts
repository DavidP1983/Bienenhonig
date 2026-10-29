import { deliveryApi } from "../api/delivery.api";

export const deliveryService = {
  getDeliveryPrice: (signal?: AbortSignal) =>
    deliveryApi.getDeliveryPrice(signal),
};
