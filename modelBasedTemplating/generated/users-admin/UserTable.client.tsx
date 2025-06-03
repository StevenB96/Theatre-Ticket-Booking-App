// app/admin/users/UserTable.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { User } from '@/types/user';
import UserTableServer from './UserTable.server';

interface UserTableProps {
  data: User[];
};

export default function UserTable({ data }: UserTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this user?')) return;
    await fetch('/api/users/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <UserTableServer data={data} onDelete={handleDelete} />;
};