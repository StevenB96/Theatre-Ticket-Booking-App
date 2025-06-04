// src/library/db/performance.ts
import db from '../dbClient';
import type {
  Performance,
  CreatePerformanceInput,
  UpdatePerformanceInput,
} from '@/types/performance';

// Get all performances
export async function getAllPerformances(): Promise<Performance[]> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Performance>('performance')
    .select(
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at'
    )
    .orderBy('id', 'asc');
}

// Get one performance by ID
export async function getPerformanceById(
  id: number
): Promise<Performance | undefined> {
  // @ts-ignore: untyped function call may not accept type arguments
  return db<Performance>('performance').where({ id }).first();
}

// Create a new performance
export async function createPerformance(
  input: CreatePerformanceInput
): Promise<Performance> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [newPerformance] = await db<Performance>('performance')
    .insert({
      theatre_has_show_id: input.theatre_has_show_id,
      start_time: input.start_time,
      type: input.type,
      status: input.status,
    })
    .returning([
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at',
    ]);

  return newPerformance;
}

// Update an existing performance
export async function updatePerformance(
  id: number,
  data: UpdatePerformanceInput
): Promise<Performance> {
  // @ts-ignore: untyped function call may not accept type arguments
  const [updatedPerformance] = await db<Performance>('performance')
    .where({ id })
    .update(data)
    .returning([
      'id',
      'theatre_has_show_id',
      'start_time',
      'type',
      'status',
      'created_at',
      'updated_at',
    ]);

  return updatedPerformance;
}

// Delete an existing performance
export async function deletePerformance(id: number): Promise<void> {
  await db('performance').where({ id }).del();
}
