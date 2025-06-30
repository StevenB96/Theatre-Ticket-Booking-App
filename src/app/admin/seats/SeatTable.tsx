// app/admin/seats/SeatTable.tsx

'use client';

import Link from 'next/link';
import type { Seat } from '@/types/seat';
import { deleteSeatByIdAction } from './actions';
import type { ReactNode } from 'react';

interface Props {
  data: Seat[];
}

type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

export default function SeatTable({ data }: Props) {
  const columns: Column<Seat>[] = [
    { key: 'id', header: 'ID', render: ({ id }) => id },
    { key: 'theatre_id', header: 'Theatre ID', render: ({ theatre_id }) => theatre_id },
    { key: 'code', header: 'Code', render: ({ code }) => code },
    { key: 'zone', header: 'Zone', render: ({ zone }) => zone },
    {
      key: 'status', header: 'Status', render: ({ status }) =>
        status === 1 ? 'Active' : status === 0 ? 'Inactive' : 'Unknown'
    },
    {
      key: 'created_at', header: 'Created At', render: s =>
        s.created_at ? new Date(s.created_at).toLocaleDateString('en-GB') : 'N/A'
    },
    {
      key: 'updated_at', header: 'Updated At', render: s =>
        s.updated_at ? new Date(s.updated_at).toLocaleDateString('en-GB') : 'N/A'
    },
    {
      key: 'actions', header: 'Actions', render: s => (
        <div className="actions">
          <Link href={`/admin/seats/${s.id}`}>Edit</Link>{' '}
          <button
            type="submit"
            name="seatId"
            value={s.id}
            onClick={e => { if (!confirm('Delete this seat?')) e.preventDefault(); }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <form action={deleteSeatByIdAction}>
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