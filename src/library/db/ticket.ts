// src/library/db/ticket.ts
import db from '../dbClient';
import type {
  Ticket,
  CreateTicketInput,
  UpdateTicketInput,
} from '@/types/ticket';

// Get all tickets
export async function getAllTickets(): Promise<Ticket[]> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Ticket>('ticket')
    .select(
      'id',
      'user_id',
      'seat_id',
      'performance_id',
      'price',
      'status',
      'created_at',
      'updated_at'
    )
    .orderBy('id', 'asc');
}

// Get one ticket by ID
export async function getTicketById(
  id: number
): Promise<Ticket | undefined> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Ticket>('ticket').where({ id }).first();
}

// Create a new ticket
export async function createTicket(
  input: CreateTicketInput
): Promise<Ticket> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [newTicket] = await db<Ticket>('ticket')
    .insert({
      user_id: input.user_id,
      seat_id: input.seat_id,
      performance_id: input.performance_id,
      price: input.price,
      status: input.status,
    })
    .returning([
      'id',
      'user_id',
      'seat_id',
      'performance_id',
      'price',
      'status',
      'created_at',
      'updated_at'
    ]);

  return newTicket;
}

// Update an existing ticket
export async function updateTicket(
  id: number,
  data: UpdateTicketInput
): Promise<Ticket> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updatedTicket] = await db<Ticket>('ticket')
    .where({ id })
    .update(data)
    .returning([
      'id',
      'user_id',
      'seat_id',
      'performance_id',
      'price',
      'status',
      'created_at',
      'updated_at'
    ]);

  return updatedTicket;
}

// Delete an existing ticket
export async function deleteTicket(id: number): Promise<void> {
  await db('ticket').where({ id }).del();
}