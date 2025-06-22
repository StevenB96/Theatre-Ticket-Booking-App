// app/admin/tickets/TicketTable.tsx
'use client';

import Link from 'next/link';
import type { TicketWithRelations } from '@/types/ticket';
import { deleteTicketByIdAction } from './actions';

interface Props {
  data: TicketWithRelations[];
}

export default function TicketTable({ data }: Props) {
  return (
    <form action={deleteTicketByIdAction}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Seat</th>
            <th>Performance</th>
            <th>Price</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ticket) => (
            <tr key={ticket.id} data-row-id={ticket.id}>
              <td>
                {ticket.id}
              </td>
              <td>
                {ticket.user?.username}
              </td>
              <td>
                {ticket.seat?.code}
              </td>
              <td>{ticket.performance?.show?.name} - {ticket.performance?.theatre?.name}</td>
              <td>
                {ticket.price}
              </td>
              <td>
                {ticket.status === 1 ? 'Active' : ticket.status === 0 ? 'Inactive' : 'Unknown'}
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
