// app/admin/tickets/actions.ts
'use server';

import {
  createTicket,
  updateTicketById,
  deleteTicketById,
} from '@/library/db/ticket';
import type {
  CreateTicketInput,
  UpdateTicketInput,
} from '@/types/ticket';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/**
 * Server action to create a new ticket.
 * - Redirects to the newly created ticket's page.
 * - Revalidates the "/admin/tickets" path.
 */
export async function createTicketAction(formData: FormData) {
  const input: CreateTicketInput = {
    user_id: Number(formData.get('user_id') ?? 0),
    seat_id: Number(formData.get('seat_id') ?? 0),
    performance_id: Number(formData.get('performance_id') ?? 0),
    price: Number(formData.get('price') ?? 0),
    status: Number(formData.get('status') ?? 0),
  };

  const ticket = await createTicket(input);
  revalidatePath('/admin/tickets/' + ticket.id);
  redirect('/admin/tickets/' + ticket.id);
}

/**
 * Server action to update an existing ticket by ID.
 * - Redirects back to the list after success.
 * - Revalidates the "/admin/tickets" path.
 */
export async function updateTicketByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (!id) throw new Error('ID is required');

  const input: UpdateTicketInput = {
    id: Number(formData.get('id') ?? 0),
    user_id: Number(formData.get('user_id') ?? 0),
    seat_id: Number(formData.get('seat_id') ?? 0),
    performance_id: Number(formData.get('performance_id') ?? 0),
    price: Number(formData.get('price') ?? 0),
    status: Number(formData.get('status') ?? 0),
  };

  await updateTicketById(id, input);
  revalidatePath('/admin/tickets');
  redirect('/admin/tickets');
}

/**
 * Server action to delete a ticket by ID.
 * - Revalidates the "/admin/tickets" path after deletion.
 */
export async function deleteTicketByIdAction(formData: FormData) {
  const id = Number(formData.get('ticketId'));
  if (!id) return;

  await deleteTicketById(id);
  revalidatePath('/admin/tickets');
};
