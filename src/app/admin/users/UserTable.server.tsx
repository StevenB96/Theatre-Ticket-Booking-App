// app/admin/users/UserTable.server.tsx
import Link from 'next/link';
import type { User } from '@/types/user';

interface UserTableServerProps {
  data: User[];
  onDelete?: (id: number) => void;
};

export default function UserTableServer({
  data,
  onDelete,
}: UserTableServerProps) {
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
        {data.map((user) => (
          <tr key={user.id}>
            <td>
              {user.id}
            </td>
            <td>
              {user.username}
            </td>
            <td>
              {user.email}
            </td>
            <td>
              {user.role}
            </td>
            <td>
              {user.status}
            </td>
            <td>
              {new Date(user.created_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              {new Date(user.updated_at).toLocaleDateString('en-GB')}
            </td>
            <td>
              <Link href={`/admin/users/${user.id}`}>Edit</Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(user.id)}
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