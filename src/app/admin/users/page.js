// src/app/admin/users/page.js
import Link from 'next/link';
import UserList from './UserList'; // Relative path preferred in app/
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
      <UserList initialData={users} />
    </div>
  );
}
