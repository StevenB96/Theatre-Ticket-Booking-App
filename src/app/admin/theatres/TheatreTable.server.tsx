// app/admin/theatres/TheatreTable.server.tsx
import Link from 'next/link';
import type { Theatre } from '@/types/theatre';

interface TheatreTableServerProps {
  data: Theatre[];
  onDelete?: (id: number) => void;
};

export default function TheatreTableServer({
  data,
  onDelete,
}: TheatreTableServerProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((theatre) => (
          <tr key={theatre.id}>
            <td>{
              theatre.id
            }</td>
            <td>{
              theatre.name
            }</td>
            <td>{
              theatre.address
            }</td>
            <td>{
              theatre.status
            }</td>
            <td>
              {new Date(theatre.created_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              {new Date(theatre.updated_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              <Link href={`/admin/theatres/${theatre.id}`}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(theatre.id)}
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