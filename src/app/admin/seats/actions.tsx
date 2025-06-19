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
  const theatre_id = Number(formData.get('theatreId'));
  if (theatre_id == null) {
    throw new Error('Theatre ID is required');
  }

  const zone = String(formData.get('zone'));
  if (!zone) {
    throw new Error('Zone is required');
  }

  const code = String(formData.get('code'));
  if (!code) {
    throw new Error('Code is required');
  }

  const status = Number(formData.get('status'));
  if (status == null) {
    throw new Error('Status is required');
  }

  const input: CreateSeatInput = {
    theatre_id,
    zone,
    code,
    status,
  };

  const seat = await createSeat(input);
  revalidatePath(`/admin/seats/${seat.id}`);
  redirect(`/admin/seats/${seat.id}`);
}

/**
 * Server action to update an existing seat by ID.
 * - Redirects back to the list after success.
 * - Revalidates the "/admin/seats" path.
 */
export async function updateSeatByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (id == null) {
    throw new Error('ID is required');
  }

  const theatre_id = Number(formData.get('theatreId'));
  if (theatre_id == null) {
    throw new Error('Theatre ID is required');
  }

  const zone = String(formData.get('zone'));
  if (!zone) {
    throw new Error('Zone is required');
  }

  const code = String(formData.get('code'));
  if (!code) {
    throw new Error('Code is required');
  }

  const status = Number(formData.get('status'));
  if (status == null) {
    throw new Error('Status is required');
  }

  const input: UpdateSeatInput = {
    id,
    theatre_id,
    zone,
    code,
    status,
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
