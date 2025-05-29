// src/app/admin/theatres/TheatreTable.server.js
import Link from 'next/link';

export default function TheatreTableServer({ data, onDelete }) {
  return (
    <table className="w-full mt-4 border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Address</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t) => (
          <tr key={t.id} className="text-center">
            <td className="p-2 border">{
              t.id
            }</td>
            <td className="p-2 border">{
              t.name
            }</td>
            <td className="p-2 border">{
              t.address
            }</td>
            <td className="p-2 border space-x-2">
              <Link href={`/admin/theatres/${t.id}`}>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(t.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
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