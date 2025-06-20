// app/admin/shows/ShowTable.tsx
'use client';

import Link from 'next/link';
import type { Show } from '@/types/show';
import { deleteShowByIdAction } from './actions';

interface Props {
  data: Show[];
}

export default function ShowTable({ data }: Props) {
  return (
    <form action={deleteShowByIdAction}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((show) => (
            <tr key={show.id} data-row-id={show.id}>
              <td>{show.id}</td>
              <td>{show.name}</td>
              <td>{show.status}</td>
              <td>
                {show.created_at
                  ? new Date(show.created_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                {show.updated_at
                  ? new Date(show.updated_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                <Link href={`/admin/shows/${show.id}`}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="showId"
                  value={show.id}
                  onClick={(e) => {
                    if (!confirm('Delete this show?')) {
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
