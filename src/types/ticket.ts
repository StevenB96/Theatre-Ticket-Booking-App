// src/types/ticket.ts
export interface Ticket {
  id: number;
  user_id: number;
  seat_id: number;
  performance_id: number;
  price: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTicketInput {
  user_id: number;
  seat_id: number;
  performance_id: number;
  price: number;
  status: number;
}

export interface UpdateTicketInput extends CreateTicketInput {
  id: number;
}