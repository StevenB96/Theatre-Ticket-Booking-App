// src/types/seat.ts
export interface Seat {
  id: number;
  theatre_id: number;
  code: string;
  zone: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSeatInput {
  theatre_id: number;
  code: string;
  zone: string;
  status: number;
}

export interface UpdateSeatInput extends CreateSeatInput {
  id: number;
}