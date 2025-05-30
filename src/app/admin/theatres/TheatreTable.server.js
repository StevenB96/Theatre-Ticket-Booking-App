// src/app/admin/theatres/TheatreTable.server.js
import Link from 'next/link';

export default function TheatreTableServer({ data, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t) => (
          <tr key={t.id}>
            <td>{
              t.id
            }</td>
            <td>{
              t.name
            }</td>
            <td>{
              t.address
            }</td>
            <td>
              <Link href={`/admin/theatres/${t.id}`}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(t.id)}
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