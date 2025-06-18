// src/types/seat.ts
export interface Seat {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. id: number;
  */
}

export interface CreateSeatInput {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. status: number;
  */
}

export interface UpdateSeatInput extends CreateSeatInput {
  id: number;
}