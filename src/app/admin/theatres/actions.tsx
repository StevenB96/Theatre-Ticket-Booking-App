// app/admin/theatres/actions.ts

'use server';

import {
  createTheatre,
  updateTheatreById,
  deleteTheatreById,
} from '@/library/db/theatre';
import type {
  CreateTheatreInput,
  UpdateTheatreInput,
} from '@/types/theatre';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new theatre.
 * - Redirects to the newly created theatre's page.
 * - Revalidates the "/admin/theatres" path.
 */
export async function createTheatreAction(formData: FormData) {
  const name = String(formData.get('name'));
  if (!name) throw new Error('Name is required');

  const address = String(formData.get('address'));
  if (address === null) throw new Error('Address is required');

  const status = Number(formData.get('status'));
  if (status === null) throw new Error('Status is required');

  const input: CreateTheatreInput = {
    name,
    address,
    status
  };

  const theatre = await createTheatre(input);
  revalidatePath('/admin/theatres/' + theatre.id);
  redirect('/admin/theatres/' + theatre.id);
}

/**
 * Server action to update an existing theatre by ID.
 * - Redirects back to the list after success.
 * - Revalidates the "/admin/theatres" path.
 */
export async function updateTheatreByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) throw new Error('ID is required');

  const name = String(formData.get('name'));
  if (!name) throw new Error('Name is required');

  const address = String(formData.get('address'));
  if (address === null) throw new Error('Address is required');

  const status = Number(formData.get('status'));
  if (status === null) throw new Error('Status is required');

  const input: UpdateTheatreInput = {
    id,
    name,
    address,
    status
  };

  await updateTheatreById(id, input);
  revalidatePath('/admin/theatres');
  redirect('/admin/theatres');
}

/**
 * Server action to delete a theatre by ID.
 * - Revalidates the "/admin/theatres" path after deletion.
 */
export async function deleteTheatreByIdAction(formData: FormData) {
  const id = Number(formData.get('theatreId'));
  if (!id) return;

  await deleteTheatreById(id);
  revalidatePath('/admin/theatres');
};
