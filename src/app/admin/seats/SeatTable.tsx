// app/admin/seats/SeatTable.tsx
'use client';

import Link from 'next/link';
import type { Seat } from '@/types/seat';
import { deleteSeatByIdAction } from './actions';

interface Props {
  data: Seat[];
}

export default function SeatTable({ data }: Props) {
  return (
    <form action={deleteSeatByIdAction}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Theatre ID</th>
            <th>Code</th>
            <th>Zone</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((seat) => (
            <tr key={seat.id}>
              <td>
                {seat.id}
              </td>
              <td>
                {seat.theatre_id}
              </td>
              <td>
                {seat.code}
              </td>
              <td>
                {seat.zone}
              </td>
              <td>
                {seat.status}
              </td>
              <td>
                {new Date(seat.created_at).toLocaleDateString('en-GB')}
              </td>
              <td>
                {new Date(seat.updated_at).toLocaleDateString('en-GB')}
              </td>
              <td>
                <Link href={'/admin/seats/' + seat.id}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="seatId"
                  value={seat.id}
                  onClick={(e) => {
                    if (!confirm('Delete this seat?')) {
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
