// app/admin/theatres/TheatreTable.tsx

'use client';

import Link from 'next/link';
import type { Theatre } from '@/types/theatre';
import { deleteTheatreByIdAction } from './actions';

interface Props {
  data: Theatre[];
}

export default function TheatreTable({ data }: Props) {
  return (
    <form action={deleteTheatreByIdAction}>
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
                {theatre.created_at
                  ? new Date(theatre.created_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                {theatre.updated_at
                  ? new Date(theatre.updated_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                <Link href={'/admin/theatres/' + theatre.id}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="theatreId"
                  value={theatre.id}
                  onClick={(e) => {
                    if (!confirm('Delete this theatre?')) {
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
