// app/admin/users/page.tsx
// import Link from 'next/link';
import UserTable from './UserTable.client';
import { getAllUsers } from '@/library/db/user';

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <h1>Users</h1>
      <p>
        <Link href="/admin/users/create">+ New User</Link>
      </p>
      <UserTable data={users} />
    </div>
  );
};