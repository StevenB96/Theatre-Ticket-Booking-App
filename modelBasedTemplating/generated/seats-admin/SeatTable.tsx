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
            {/* TEMPLATE COMMENT:
                Define your table headers.
                Example:
                  <th>Name</th>
                  <th>Status</th>
            */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {/* TEMPLATE COMMENT:
                  Map fields from item for display.
                  Example:
                    <td>{item.name}</td>
                    <td>{item.status}</td>
              */}
              <td>
                <Link href={'/admin/seats/' + item.id}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="seatId"
                  value={item.id}
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
