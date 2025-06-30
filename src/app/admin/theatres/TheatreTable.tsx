// app/admin/theatres/TheatreTable.tsx

'use client';

import Link from 'next/link';
import type { Theatre } from '@/types/theatre';
import { deleteTheatreByIdAction } from './actions';
import type { ReactNode } from 'react';

interface Props {
  data: Theatre[];
}

type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

export default function TheatreTable({ data }: Props) {
  const columns: Column<Theatre>[] = [
    { key: 'id', header: 'ID', render: ({ id }) => id },
    { key: 'name', header: 'Name', render: ({ name }) => name },
    { key: 'address', header: 'Address', render: ({ address }) => address },
    {
      key: 'status', header: 'Status', render: ({ status }) =>
        status === 1 ? 'Active' : status === 0 ? 'Inactive' : 'Unknown'
    },
    {
      key: 'created_at', header: 'Created At', render: t =>
        t.created_at ? new Date(t.created_at).toLocaleDateString('en-GB') : 'N/A'
    },
    {
      key: 'updated_at', header: 'Updated At', render: t =>
        t.updated_at ? new Date(t.updated_at).toLocaleDateString('en-GB') : 'N/A'
    },
    {
      key: 'actions', header: 'Actions', render: t => (
        <div className="actions">
          <Link href={`/admin/theatres/${t.id}`}>Edit</Link>{' '}
          <button
            type="submit"
            name="theatreId"
            value={t.id}
            onClick={e => { if (!confirm('Delete this theatre?')) e.preventDefault(); }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <form action={deleteTheatreByIdAction}>
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