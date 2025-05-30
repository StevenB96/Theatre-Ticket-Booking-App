'use client';

import { useRouter } from 'next/navigation';
import UserTableServer from './Table.server';

export default function UserTable({ data }) {
  const router = useRouter();

  async function handleDelete(id) {
    if (!confirm('Delete this user?')) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    router.refresh(); // Refresh server data
  };

  return <UserTableServer data={data} onDelete={handleDelete} />;
};
