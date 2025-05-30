import Link from 'next/link';
import UserTable from './UserTable.client';
import { getAllUsers } from '@/lib/db/user';

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p>
        <Link href="/admin/users/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">+ New User</button>
        </Link>
      </p>
      <UserTable data={users} />
    </div>
  );
};
