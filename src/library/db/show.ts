// src/library/db/show.ts
import db from '../dbClient';
import type {
  Show,
  CreateShowInput,
  UpdateShowInput,
} from '@/types/show';

// Get all shows
export async function getAllShows(): Promise<Show[]> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Show>('show')
    .select(
      'id',
      'name',
      'status',
      'created_at',
      'updated_at'
    )
    .orderBy('id', 'asc');
}

// Get one show by ID
export async function getShowById(
  id: number
): Promise<Show | undefined> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Show>('show').where({ id }).first();
}

// Create a new show
export async function createShow(
  input: CreateShowInput
): Promise<Show> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [newShow] = await db<Show>('show')
    .insert({
      name: input.name,
      status: input.status,
    })
    .returning([
      'id',
      'name',
      'status',
      'created_at',
      'updated_at'
    ]);
  return newShow;
}

// Update an existing show
export async function updateShow(
  id: number,
  data: UpdateShowInput
): Promise<Show> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updatedShow] = await db<Show>('show')
    .where({ id })
    .update(data)
    .returning([
      'id',
      'name',
      'status',
      'created_at',
      'updated_at'
    ]);
  return updatedShow;
}

// Delete an existing show
export async function deleteShow(id: number): Promise<void> {
  await db('show').where({ id }).del();
}