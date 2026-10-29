import { api } from "@/shared/api/client";

export const deliveryApi = {
  getDeliveryPrice: (signal?: AbortSignal) =>
    api.get<{ deliveryPrice: number }>("/api/delivery", { signal }),
};
