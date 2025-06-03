// src/types/theatre.ts
export interface Theatre {
  id: number;
  name: string;
  address: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTheatreInput {
  name: string;
  address: string;
  status: number;
}

export interface UpdateTheatreInput extends CreateTheatreInput {
  id: number;
}