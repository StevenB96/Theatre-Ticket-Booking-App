// app/admin/seats/SeatTable.server.tsx
import Link from 'next/link';
import type { Seat } from '@/types/seat';

interface SeatTableServerProps {
  data: Seat[];
  onDelete?: (id: number) => void;
};

export default function SeatTableServer({
  data,
  onDelete,
}: SeatTableServerProps) {
  return (
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
              <Link href={'/admin/seats/' + seat.id}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(seat.id)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};