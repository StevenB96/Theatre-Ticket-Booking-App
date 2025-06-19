// app/admin/tickets/TicketTable.tsx
'use client';

import Link from 'next/link';
import type { Ticket } from '@/types/ticket';
import { deleteTicketByIdAction } from './actions';

interface Props {
  data: Ticket[];
}

export default function TicketTable({ data }: Props) {
  return (
    <form action={deleteTicketByIdAction}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Seat ID</th>
            <th>Performance ID</th>
            <th>Price</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket) => (
            <tr key={ticket.id}>
              <td>
                {ticket.id}
              </td>
              <td>
                {ticket.user_id}
              </td>
              <td>
                {ticket.seat_id}
              </td>
              <td>
                {ticket.performance_id}
              </td>
              <td>
                {ticket.price}
              </td>
              <td>
                {ticket.status}
              </td>
              <td>
                {ticket.created_at
                  ? new Date(ticket.created_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                {ticket.updated_at
                  ? new Date(ticket.updated_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                <Link href={'/admin/tickets/' + ticket.id}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="ticketId"
                  value={ticket.id}
                  onClick={(e) => {
                    if (!confirm('Delete this ticket?')) {
                      e.preventDefault();
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
