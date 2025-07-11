// app/admin/tickets/TicketTable.tsx

'use client';

import Link from 'next/link';
import type { TicketWithRelations } from '@/types/ticket';
import type { PerformanceWithRelations } from '@/types/performance';
import { deleteTicketByIdAction } from './actions';
import type { ReactNode } from 'react';

interface Props {
  data: (TicketWithRelations & {
    performance?: PerformanceWithRelations
  })[];
}

type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

export default function TicketTable({ data }: Props) {
  const columns: Column<TicketWithRelations & { performance?: PerformanceWithRelations }>[] = [
    { key: 'id', header: 'ID', render: ({ id }) => id },
    { key: 'user', header: 'User', render: tk => tk.user?.username ?? '—' },
    { key: 'seat', header: 'Seat', render: tk => tk.seat?.code ?? '—' },
    {
      key: 'performance',
      header: 'Performance',
      render: tk => {
        const showName = tk.performance?.show?.name ?? '';
        const theatreName = tk.performance?.theatre?.name ?? '';
        const date = new Date(tk.performance?.start_time).toLocaleDateString('en-GB', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        });
        const typeLabel =
          tk.performance.type === 1
            ? 'evening'
            : tk.performance.type === 0
              ? 'matinee'
              : 'unknown';
        const label = `${showName} (${theatreName}) ${typeLabel} performance on the ${date}`;
        return label;
      }
    },
    { key: 'price', header: 'Price', render: ({ price }) => price },
    {
      key: 'status',
      header: 'Status',
      render: tk =>
        tk.status === 1
          ? 'Active'
          : tk.status === 0
            ? 'Inactive'
            : 'Unknown',
    },
    {
      key: 'created_at',
      header: 'Created At',
      render: tk =>
        tk.created_at
          ? new Date(tk.created_at).toLocaleDateString('en-GB')
          : 'N/A',
    },
    {
      key: 'updated_at',
      header: 'Updated At',
      render: tk =>
        tk.updated_at
          ? new Date(tk.updated_at).toLocaleDateString('en-GB')
          : 'N/A',
    },
    {
      key: 'actions',
      header: 'Actions',
      render: tk => (
        <div className="actions">
          <Link href={`/admin/tickets/${tk.id}`}>Edit</Link>{' '}
          <button
            type="submit"
            name="ticketId"
            value={tk.id}
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
