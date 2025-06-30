// app/admin/performances/PerformanceTable.tsx

'use client';

import Link from 'next/link';
import type { PerformanceWithRelations } from '@/types/performance';
import { deletePerformanceByIdAction } from './actions';
import type { ReactNode } from 'react';

interface Props {
  data: PerformanceWithRelations[];
}

type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

export default function PerformanceTable({ data }: Props) {
  const columns: Column<PerformanceWithRelations>[] = [
    { key: 'id', header: 'ID', render: ({ id }) => id },
    {
      key: 'performance', header: 'Show – Theatre', render: p =>
        p.show?.name && p.theatre?.name
          ? `${p.show.name} – ${p.theatre.name}`
          : '—'
    },
    {
      key: 'date', header: 'Date', render: p =>
        new Date(p.start_time).toLocaleDateString('en-GB', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        })
    },
    {
      key: 'time', header: 'Time', render: p =>
        new Date(p.start_time).toLocaleTimeString('en-GB', {
          hour: '2-digit', minute: '2-digit'
        })
    },
    {
      key: 'type', header: 'Type', render: p =>
        p.type === 1 ? 'Evening' : p.type === 0 ? 'Matinee' : 'Unknown'
    },
    {
      key: 'status', header: 'Status', render: p =>
        p.status === 1 ? 'Active' : p.status === 0 ? 'Inactive' : 'Unknown'
    },
    {
      key: 'created_at', header: 'Created At', render: p =>
        p.created_at ? new Date(p.created_at).toLocaleDateString('en-GB') : 'N/A'
    },
    {
      key: 'updated_at', header: 'Updated At', render: p =>
        p.updated_at ? new Date(p.updated_at).toLocaleDateString('en-GB') : 'N/A'
    },
    {
      key: 'actions', header: 'Actions', render: p => (
        <div className="actions">
          <Link href={`/admin/performances/${p.id}`}>Edit</Link>{' '}
          <button
            type="submit"
            name="performanceId"
            value={p.id}
            onClick={e => { if (!confirm('Delete this performance?')) e.preventDefault(); }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <form action={deletePerformanceByIdAction}>
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
          {data.map(item => (
            <tr key={item.id} className="tr">
              {columns.map(col => (
                <td key={col.key} className="td">
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
