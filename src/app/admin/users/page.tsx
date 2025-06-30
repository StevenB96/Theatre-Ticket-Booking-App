// app/admin/users/page.tsx

import Link from 'next/link';
import UserTable from './UserTable';
import { getAllUsers } from '@/library/db/user';

export default async function UsersPage() {
  const users = await getAllUsers();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Users</h1>
        <Link href="/admin/users/create" className="page-action">
          + New User
        </Link>
      </div>
      <UserTable data={users} />
    </div>
  );
}
