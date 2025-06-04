// src/types/ticket.ts
export interface Ticket {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. id: number;
  */
}

export interface CreateTicketInput {
  /* TEMPLATE COMMENT:
    Add relevant attributes.
    E.g. status: number;
  */
}

export interface UpdateTicketInput extends CreateTicketInput {
  id: number;
}