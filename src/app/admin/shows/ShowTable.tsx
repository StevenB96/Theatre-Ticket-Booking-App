// app/admin/shows/ShowTable.tsx

'use client';

import Link from 'next/link';
import type { Show } from '@/types/show';
import { deleteShowByIdAction } from './actions';
import type { ReactNode } from 'react';

interface Props {
  data: Show[];
}

type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

export default function ShowTable({ data }: Props) {
  const columns: Column<Show>[] = [
    { key: 'id', header: 'ID', render: ({ id }) => id },
    { key: 'name', header: 'Name', render: ({ name }) => name },
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
          <Link href={`/admin/shows/${s.id}`}>Edit</Link>{' '}
          <button
            type="submit"
            name="showId"
            value={s.id}
            onClick={e => { if (!confirm('Delete this show?')) e.preventDefault(); }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <form action={deleteShowByIdAction}>
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