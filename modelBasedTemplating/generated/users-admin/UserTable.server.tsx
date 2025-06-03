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
          {/* TEMPLATE COMMENT:
            Add relevant attributes.
            E.g. <th>ID</th>
          */}
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            {/* TEMPLATE COMMENT:
              Add relevant attributes.
              E.g. <td>{user.id}</td>
            */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};