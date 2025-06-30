// app/admin/users/UserTable.tsx

'use client';

import Link from 'next/link';
import type { User } from '@/types/user';
import { deleteUserByIdAction } from './actions';
import type { ReactNode } from 'react';

interface Props {
  data: User[];
}

type Column<T> = {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
};

export default function UserTable({ data }: Props) {
  const columns: Column<User>[] = [
    { key: 'id', header: 'ID', render: ({ id }) => id },
    { key: 'username', header: 'Username', render: ({ username }) => username },
    { key: 'email', header: 'Email', render: ({ email }) => email },
    {
      key: 'role', header: 'Role', render: ({ role }) =>
        role === 1 ? 'Admin' : role === 0 ? 'User' : 'Unknown'
    },
    {
      key: 'status', header: 'Status', render: ({ status }) =>
        status === 1 ? 'Active' : status === 0 ? 'Inactive' : 'Unknown'
    },
    {
      key: 'created_at', header: 'Created At', render: u =>
        u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB') : 'N/A'
    },
    {
      key: 'updated_at', header: 'Updated At', render: u =>
        u.updated_at ? new Date(u.updated_at).toLocaleDateString('en-GB') : 'N/A'
    },
    {
      key: 'actions', header: 'Actions', render: u => (
        <div className="actions">
          <Link href={`/admin/users/${u.id}`}>Edit</Link>{' '}
          <button
            type="submit"
            name="userId"
            value={u.id}
            onClick={e => { if (!confirm('Delete this user?')) e.preventDefault(); }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <form action={deleteUserByIdAction}>
      <table className="table">
        <thead className="thead">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="th">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="tr">
              {columns.map(col => (
                <td key={col.key} className="td">
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}