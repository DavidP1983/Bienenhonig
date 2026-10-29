import { ticketApi } from "../api/ticket.api";
import type { SupportFormValues } from "../model/types";

export const ticketService = {
  createTicker: (data: SupportFormValues) => ticketApi.createTicket(data),
};
