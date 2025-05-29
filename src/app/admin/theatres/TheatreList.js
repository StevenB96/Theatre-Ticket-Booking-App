'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

export default function TheatreList({ initialData }) {
  const router = useRouter();

  async function handleDelete(id) {
    if (!confirm('Delete this theatre?')) return;
    await fetch(`/api/theatres/${id}`, { method: 'DELETE' });
    router.refresh();
  }

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
        {initialData.map((theatre) => (
          <tr key={theatre.id} className="text-center">
            <td className="p-2 border">{theatre.id}</td>
            <td className="p-2 border">{theatre.name}</td>
            <td className="p-2 border">{theatre.address}</td>
            <td className="p-2 border space-x-2">
              <Link href={`/admin/theatres/${theatre.id}`}>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(theatre.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TheatreList.propTypes = {
  initialData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string,
    })
  ).isRequired,
};
