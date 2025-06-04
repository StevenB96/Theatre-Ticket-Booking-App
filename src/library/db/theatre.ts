// src/library/db/theatre.ts
import db from '../dbClient';
import type {
  Theatre,
  CreateTheatreInput,
  UpdateTheatreInput,
} from '@/types/theatre';

// Get all theatres
export async function getAllTheatres(): Promise<Theatre[]> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Theatre>('theatre')
    .select(
      'id',
      'name',
      'address',
      'status',
      'created_at',
      'updated_at'
    )
    .orderBy('id', 'asc');
}

// Get one theatre by ID
export async function getTheatreById(
  id: number
): Promise<Theatre | undefined> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Theatre>('theatre').where({ id }).first();
}

// Create a new theatre
export async function createTheatre(
  input: CreateTheatreInput
): Promise<Theatre> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [newTheatre] = await db<Theatre>('theatre')
    .insert({
      name: input.name,
      address: input.address,
      status: input.status,
    })
    .returning([
      'id',
      'name',
      'address',
      'status',
      'created_at',
      'updated_at'
    ]);

  return newTheatre;
}

// Update an existing theatre
export async function updateTheatre(
  id: number,
  data: UpdateTheatreInput
): Promise<Theatre> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updatedTheatre] = await db<Theatre>('theatre')
    .where({ id })
    .update(data)
    .returning([
      'id',
      'name',
      'address',
      'status',
      'created_at',
      'updated_at'
    ]);
  return updatedTheatre;
}

// Delete an existing theatre
export async function deleteTheatre(id: number): Promise<void> {
  await db('theatre').where({ id }).del();
}