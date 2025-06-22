// app/admin/performances/PerformanceTable.tsx
'use client';

import Link from 'next/link';
import type { PerformanceWithRelations } from '@/types/performance';
import { deletePerformanceByIdAction } from './actions';

interface Props {
  data: PerformanceWithRelations[];
}

export default function PerformanceTable({ data }: Props) {
  return (
    <form action={deletePerformanceByIdAction}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Show</th>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((performance) => (
            <tr key={performance.id} data-row-id={performance.id}>
              <td>{performance.id}</td>
              <td>{performance.show?.name} - {performance.theatre?.name}</td>
              <td>
                {new Date(performance.start_time).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </td>
              <td>
                {new Date(performance.start_time).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
              <td>
                {performance.type === 1 ? 'Evening ' : performance.type === 0 ? 'Matinee ' : 'Unknown'}
              </td>
              <td>
                {performance.status === 1 ? 'Active' : performance.status === 0 ? 'Inactive' : 'Unknown'}
              </td>
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
