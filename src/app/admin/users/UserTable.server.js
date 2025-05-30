import Link from 'next/link';

export default function UserTableServer({ data, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((u) => (
          <tr key={u.id}>
            <td>
              {u.id}
            </td>
            <td>
              {u.username}
            </td>
            <td>
              {u.email}
            </td>
            <td>
              {new Date(u.created_at).toISOString()}
            </td>
            <td>
              <Link href={`/admin/users/${u.id}`}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(u.id)}
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
