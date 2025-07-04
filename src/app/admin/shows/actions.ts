// app/admin/shows/actions.ts
'use server';

import { ShowModel } from '@/models/ShowModel';
import type {
  CreateShowInput,
  UpdateShowInput
} from '@/types/show';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new show.
 * - Redirects to the shows list after success.
 * - Revalidates the "/admin/shows" path.
 */
export async function createShowAction(formData: FormData) {
  const name = String(formData.get('name'));
  if (name == null) {
    throw new Error('Name is required');
  }

  const status = Number(formData.get('status'));

  if (status == null) {
    throw new Error('Status is required');
  }

  const input: CreateShowInput = {
    name,
    status
  };

  const show = await ShowModel.create(input);

  revalidatePath(`/admin/shows/${show.data.id}`);
  redirect(`/admin/shows/${show.data.id}`);
}

/**
 * Server action to update a show by ID.
 * - Redirects back to the shows list after success.
 * - Revalidates the "/admin/shows" path.
 */
export async function updateShowByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (id == null) {
    throw new Error('ID is required');
  }

  const name = String(formData.get('name'));
  if (name == null) {
    throw new Error('Name is required');
  }

  const status = Number(formData.get('status'));

  if (status == null) {
    throw new Error('Status is required');
  }

  const input: UpdateShowInput = {
    id,
    name,
    status,
  };

  await ShowModel.update(id, input);

  revalidatePath('/admin/shows');
  redirect('/admin/shows');
}

/**
 * Server action to delete a show by ID.
 * - Revalidates the "/admin/shows" path after deletion.
 */
export async function deleteShowByIdAction(formData: FormData) {
  const id = Number(formData.get('showId'));
  if (!id) return;

  await ShowModel.delete(id);
  revalidatePath('/admin/shows');
}