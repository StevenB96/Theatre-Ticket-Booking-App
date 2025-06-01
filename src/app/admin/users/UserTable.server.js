import Link from 'next/link';

export default function UserTableServer({ data, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
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
              {u.role}
            </td>
            <td>
              {u.status}
            </td>
            <td>
              {new Date(u.created_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              {new Date(u.updated_at).toLocaleDateString('en-GB')}
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
