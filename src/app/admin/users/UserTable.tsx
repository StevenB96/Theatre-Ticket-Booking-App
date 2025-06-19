// app/admin/users/UserTable.tsx
'use client';

import Link from 'next/link';
import type { User } from '@/types/user';
import { deleteUserByIdAction } from './actions';

interface Props {
  data: User[];
}

export default function UserTable({ data }: Props) {
  return (
    <form action={deleteUserByIdAction}>
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
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                {user.updated_at
                  ? new Date(user.updated_at).toLocaleDateString('en-GB')
                  : 'N/A'}
              </td>
              <td>
                <Link href={'/admin/users/' + user.id}>Edit</Link>{' '}
                <button
                  type="submit"
                  name="userId"
                  value={user.id}
                  onClick={(e) => {
                    if (!confirm('Delete this user?')) {
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
