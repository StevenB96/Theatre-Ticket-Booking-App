// src/library/db/seat.ts
import db from '../dbClient';
import type {
  Seat,
  CreateSeatInput,
  UpdateSeatInput,
} from '@/types/seat';

// Get all seats
export async function getAllSeats(): Promise<Seat[]> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Seat>('seat')
    .select(
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    )
    .orderBy('id', 'asc');
}

// Get one seat by ID
export async function getSeatById(
  id: number
): Promise<Seat | undefined> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Seat>('seat').where({ id }).first();
}

// Create a new seat
export async function createSeat(
  input: CreateSeatInput
): Promise<Seat> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [newSeat] = await db<Seat>('seat')
    .insert({
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. status: input.status,
      */
    })
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    ]);
  return newSeat;
}

// Update an existing seat
export async function updateSeat(
  id: number,
  data: UpdateSeatInput
): Promise<Seat> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updatedSeat] = await db<Seat>('seat')
    .where({ id })
    .update(data)
    .returning([
      /* TEMPLATE COMMENT:
        Add relevant attributes.
        E.g. 'id',
      */
    ]);
  return updatedSeat;
}

// Delete an existing seat
export async function deleteSeat(id: number): Promise<void> {
  await db('seat').where({ id }).del();
}