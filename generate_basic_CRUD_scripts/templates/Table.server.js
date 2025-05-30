import Link from 'next/link';

export default function UserTableServer({ data, onDelete }) {
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
        {data.map((u) => (
          <tr key={u.id} className="text-center">
            <td className="p-2 border">
              {u.id}
            </td>
            <td className="p-2 border">
              {u.username}
            </td>
            <td className="p-2 border">
              {u.email}
            </td>
            <td className="p-2 border">
              {new Date(u.created_at).toISOString()}
            </td>
            <td className="p-2 border space-x-2">
              <Link href={`/admin/users/${u.id}`}>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(u.id)}
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
