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
      'id',
      'theatre_id',
      'code',
      'zone',
      'status',
      'created_at',
      'updated_at',
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
      theatre_id: input.theatre_id,
      code: input.code,
      zone: input.zone,
      status: input.status,
    })
    .returning([
      'id',
      'theatre_id',
      'code',
      'zone',
      'status',
      'created_at',
      'updated_at',
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
      'id',
      'theatre_id',
      'code',
      'zone',
      'status',
      'created_at',
      'updated_at',
    ]);

  return updatedSeat;
}

// Delete an existing seat
export async function deleteSeat(id: number): Promise<void> {
  await db('seat').where({ id }).del();
}