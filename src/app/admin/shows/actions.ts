// app/admin/shows/actions.ts
'use server';

import {
  createShow,
  updateShowById,
  deleteShowById,
} from '@/library/db/show';
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
  const status = Number(formData.get('status'));

  if (!name) {
    throw new Error('Name is required');
  }

  const input: CreateShowInput = { name, status };
  const show = await createShow(input);

  revalidatePath('/admin/shows');
  redirect('/admin/shows');
}

/**
 * Server action to update a show by ID.
 * - Redirects back to the shows list after success.
 * - Revalidates the "/admin/shows" path.
 */
export async function updateShowByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  const name = String(formData.get('name'));
  const status = Number(formData.get('status'));

  if (!id || !name || !status) {
    throw new Error('Missing fields');
  }

  const input: UpdateShowInput = {
    id,
    name,
    status
  };

  await updateShowById(id, input);

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

  await deleteShowById(id);
  revalidatePath('/admin/shows');
}