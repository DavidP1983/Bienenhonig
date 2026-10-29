import { useQuery } from '@tanstack/react-query';
import { deliveryService } from './delivery.service';
import { deliveryKeys } from './queryKeys';

export const useDelivery = () => {
  return useQuery({
    queryKey: deliveryKeys.price(),
    queryFn: ({ signal }) => deliveryService.getDeliveryPrice(signal),
  });
};
