import { api } from '@/shared/api/client';
import type { SupportFormValues, SupportValues } from '../model/types';

export const ticketApi = {
  createTicket: (data: SupportFormValues) =>
    api.post<SupportValues>('/api/tickets', data),
};
