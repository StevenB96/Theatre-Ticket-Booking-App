// app/admin/seats/actions.ts
'use server';

import {
  createSeat,
  updateSeatById,
  deleteSeatById,
} from '@/library/db/seat';
import type {
  CreateSeatInput,
  UpdateSeatInput,
} from '@/types/seat';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new seat.
 * - Redirects to the newly created seat's page.
 * - Revalidates the "/admin/seats" path.
 */
export async function createSeatAction(formData: FormData) {
  const input: CreateSeatInput = {
    theatre_id: Number(formData.get('theatreId') ?? 0),
    zone: String(formData.get('zone') ?? ''),
    code: String(formData.get('code') ?? ''),
    status: Number(formData.get('status') ?? 0),
  };

  const seat = await createSeat(input);
  revalidatePath('/admin/seats/' + seat.id);
  redirect('/admin/seats/' + seat.id);
}

/**
 * Server action to update an existing seat by ID.
 * - Redirects back to the list after success.
 * - Revalidates the "/admin/seats" path.
 */
export async function updateSeatByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) throw new Error('ID is required');

  const input: UpdateSeatInput = {
    id,
    theatre_id: Number(formData.get('theatreId')),
    zone: String(formData.get('zone')),
    code: String(formData.get('code')),
    status: Number(formData.get('status'))
  };

  await updateSeatById(id, input);
  revalidatePath('/admin/seats');
  redirect('/admin/seats');
}

/**
 * Server action to delete a seat by ID.
 * - Revalidates the "/admin/seats" path after deletion.
 */
export async function deleteSeatByIdAction(formData: FormData) {
  const id = Number(formData.get('seatId'));
  if (!id) return;

  await deleteSeatById(id);
  revalidatePath('/admin/seats');
};
