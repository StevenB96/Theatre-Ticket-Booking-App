// app/admin/tickets/TicketTable.tsx
'use client';

import Link from 'next/link';
import type { TicketWithRelations } from '@/types/ticket';
import { deleteTicketByIdAction } from './actions';
import type { ReactNode } from 'react';

interface Props {
  data: TicketWithRelations[];
}

type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

export default function TicketTable({ data }: Props) {
  const columns: Column<TicketWithRelations>[] = [
    { key: 'id', header: 'ID', render: ({ id }) => id },
    { key: 'user', header: 'User', render: t => t.user?.username ?? '—' },
    { key: 'seat', header: 'Seat', render: t => t.seat?.code ?? '—' },
    {
      key: 'performance',
      header: 'Performance',
      render: t =>
        t.performance
          ? `${t.performance.show?.name} – ${t.performance.theatre?.name}`
          : '—',
    },
    { key: 'price', header: 'Price', render: ({ price }) => price },
    {
      key: 'status',
      header: 'Status',
      render: t =>
        t.status === 1
          ? 'Active'
          : t.status === 0
            ? 'Inactive'
            : 'Unknown',
    },
    {
      key: 'created_at',
      header: 'Created At',
      render: t =>
        t.created_at
          ? new Date(t.created_at).toLocaleDateString('en-GB')
          : 'N/A',
    },
    {
      key: 'updated_at',
      header: 'Updated At',
      render: t =>
        t.updated_at
          ? new Date(t.updated_at).toLocaleDateString('en-GB')
          : 'N/A',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: t => (
        <div className="actions">
          <Link href={`/admin/tickets/${t.id}`}>Edit</Link>{' '}
          <button
            type="submit"
            name="ticketId"
            value={t.id}
            onClick={e => {
              if (!confirm('Delete this ticket?')) e.preventDefault();
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <form action={deleteTicketByIdAction}>
      <table className="table">
        <thead className="thead">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="th">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(ticket => (
            <tr key={ticket.id} className="tr">
              {columns.map(col => (
                <td key={col.key} className="td">
                  {col.render(ticket)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
