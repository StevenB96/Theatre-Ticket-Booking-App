// app/admin/performances/PerformanceTable.tsx
'use client';

import Link from 'next/link';
import type { Performance } from '@/types/performance';
import { deletePerformanceByIdAction } from './actions';

interface Props {
  data: Performance[];
}

export default function PerformanceTable({ data }: Props) {
  return (
    <form action={deletePerformanceByIdAction}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Theatre Has Show ID</th>
            <th>Start Time</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((performance) => (
            <tr key={performance.id}>
              <td>{performance.id}</td>
              <td>{performance.theatre_has_show_id}</td>
              <td>
                {new Date(performance.start_time).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td>{performance.type}</td>
              <td>{performance.status}</td>
              <td>
                {performance.created_at
                  ? new Date(performance.created_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                {performance.updated_at
                  ? new Date(performance.updated_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                <Link href={'/admin/performances/' + performance.id}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="performanceId"
                  value={performance.id}
                  onClick={(e) => {
                    if (!confirm('Delete this performance?')) {
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
