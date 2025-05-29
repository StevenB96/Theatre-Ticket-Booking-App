'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

export default function UserList({ initialData }) {
  const router = useRouter();

  async function handleDelete(id) {
    if (!confirm('Delete this user?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    router.refresh(); // Re-fetches server component data
  }

  return (
    <table className="w-full mt-4 border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Username</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Created At</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {initialData.map((u) => (
          <tr key={u.id} className="text-center">
            <td className="p-2 border">{u.id}</td>
            <td className="p-2 border">{u.username}</td>
            <td className="p-2 border">{u.email}</td>
            <td className="p-2 border">{new Date(u.created_at).toLocaleString()}</td>
            <td className="p-2 border space-x-2">
              <Link href={`/admin/users/${u.id}`}>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(u.id)}
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

UserList.propTypes = {
  initialData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};
