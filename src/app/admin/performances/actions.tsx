// app/admin/performances/actions.ts

'use server';

import { PerformanceModel } from '@/models/PerformanceModel';
import type {
  CreatePerformanceInput,
  UpdatePerformanceInput,
} from '@/types/performance';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new performance.
 * - Redirects to the newly created performance's page.
 * - Revalidates the "/admin/performances" path.
 */
export async function createPerformanceAction(formData: FormData) {
  const theatre_has_show_id = Number(formData.get('theatre_has_show_id'));
  if (theatre_has_show_id === null) throw new Error('Theatre Has Show Id is required');

  const date = formData.get('date');
  const time = formData.get('time');
  if (!date || !time) throw new Error('Start Date and Time are required');

  // Combine date and time into an ISO string
  const start_time = new Date(`${date}T${time}`).toISOString();

  const type = Number(formData.get('type'));
  if (type === null) throw new Error('Type is required');

  const status = Number(formData.get('status'));
  if (status === null) throw new Error('Status is required');

  const input: CreatePerformanceInput = {
    start_time,
    theatre_has_show_id,
    type,
    status,
  };

  const performance = await PerformanceModel.create(input);
  revalidatePath('/admin/performances/' + performance.data.id);
  redirect('/admin/performances/' + performance.data.id);
}

/**
 * Server action to update an existing performance by ID.
 * - Redirects back to the list after success.
 * - Revalidates the "/admin/performances" path.
 */
export async function updatePerformanceByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) throw new Error('ID is required');

  const theatre_has_show_id = Number(formData.get('theatre_has_show_id'));
  if (theatre_has_show_id === null) throw new Error('Theatre Has Show Id is required');

  const date = formData.get('date');
  const time = formData.get('time');
  if (!date || !time) throw new Error('Start Date and Time are required');

  // Combine date and time into an ISO string
  const start_time = new Date(`${date}T${time}`).toISOString();

  const type = Number(formData.get('type'));
  if (type === null) throw new Error('Type is required');

  const status = Number(formData.get('status'));
  if (status === null) throw new Error('Status is required');

  const input: UpdatePerformanceInput = {
    id,
    start_time,
    theatre_has_show_id,
    type,
    status,
  };

  await PerformanceModel.update(id, input);
  revalidatePath('/admin/performances');
  redirect('/admin/performances');
}

/**
 * Server action to delete a performance by ID.
 * - Revalidates the "/admin/performances" path after deletion.
 */
export async function deletePerformanceByIdAction(formData: FormData) {
  const id = Number(formData.get('performanceId'));
  if (!id) return;

  await PerformanceModel.delete(id);
  revalidatePath('/admin/performances');
};
