// src/types/show.ts
export interface Show {
  id: number;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface CreateShowInput {
  name: string;
  status: number;
}

export interface UpdateShowInput extends CreateShowInput {
  id: number;
}