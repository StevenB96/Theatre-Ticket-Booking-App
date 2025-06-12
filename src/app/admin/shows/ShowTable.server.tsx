// app/admin/shows/ShowTable.server.tsx
import Link from 'next/link';
import type { Show } from '@/types/show';
import { deleteShowAction } from './actions';

interface ShowTableServerProps {
  data: Show[];
  onDelete?: (id: number) => void;
};

export default function ShowTableServer({
  data,
  onDelete,
}: ShowTableServerProps) {
  return (
    <form action={deleteShowAction}>
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
            <tr key={show.id}>
              <td>
                {show.id}
              </td>
              <td>
                {show.name}
              </td>
              <td>
                {show.status}
              </td>
              <td>
                {new Date(show.created_at).toLocaleDateString('en-GB')}
              </td>
              <td>
                {new Date(show.updated_at).toLocaleDateString('en-GB')}
              </td>
              <td>
                <Link href={'/admin/shows/' + show.id}>Edit</Link>
                {onDelete && (
                  <button
                    type="submit"
                    name="id"
                    value={show.id}
                    onClick={(e) => {
                      if (!confirm('Delete this show?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};