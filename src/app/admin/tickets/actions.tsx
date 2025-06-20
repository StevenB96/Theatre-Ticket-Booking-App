// app/admin/tickets/actions.ts
'use server';

import { TicketModel } from '@/models/TicketModel';
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
  const user_id = Number(formData.get('user_id'));
  if (user_id == null) {
    throw new Error('User ID is required');
  }

  const seat_id = Number(formData.get('seat_id'));
  if (seat_id == null) {
    throw new Error('Seat ID is required');
  }

  const performance_id = Number(formData.get('performance_id'));
  if (performance_id == null) {
    throw new Error('Performance ID is required');
  }

  const price = Number(formData.get('price'));
  if (price == null) {
    throw new Error('Price is required');
  }

  const status = Number(formData.get('status'));
  if (status == null) {
    throw new Error('Status is required');
  }

  const input: CreateTicketInput = {
    user_id,
    seat_id,
    performance_id,
    price,
    status,
  };

  const ticket = await TicketModel.create(input);
  revalidatePath(`/admin/tickets/${ticket.id}`);
  redirect(`/admin/tickets/${ticket.id}`);
}

/**
 * Server action to update an existing ticket by ID.
 * - Redirects back to the list after success.
 * - Revalidates the "/admin/tickets" path.
 */
export async function updateTicketByIdAction(formData: FormData) {
  const id = Number(formData.get('id'));
  if (id == null) {
    throw new Error('ID is required');
  }

  const user_id = Number(formData.get('user_id'));
  if (user_id == null) {
    throw new Error('User ID is required');
  }

  const seat_id = Number(formData.get('seat_id'));
  if (seat_id == null) {
    throw new Error('Seat ID is required');
  }

  const performance_id = Number(formData.get('performance_id'));
  if (performance_id == null) {
    throw new Error('Performance ID is required');
  }

  const price = Number(formData.get('price'));
  if (price == null) {
    throw new Error('Price is required');
  }

  const status = Number(formData.get('status'));
  if (status == null) {
    throw new Error('Status is required');
  }

  const input: UpdateTicketInput = {
    id,
    user_id,
    seat_id,
    performance_id,
    price,
    status,
  };

  await TicketModel.update(id, input);
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

  await TicketModel.delete(id);
  revalidatePath('/admin/tickets');
};
