// src/types/ticket.ts

import type { User } from '@/types/user';
import type { Seat } from '@/types/seat';
import type { Performance } from '@/types/performance';

export interface Ticket {
  id: number;
  user_id: number;
  seat_id: number;
  performance_id: number;
  price: number;
  status: number;
  created_at?: string;
  updated_at?: string;
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

export interface TicketWithRelations extends Ticket {
  user: User | null;
  performance: Performance | null;
  seat: Seat | null;
}