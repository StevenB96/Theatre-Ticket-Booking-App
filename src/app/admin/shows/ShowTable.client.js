'use client';

import { useRouter } from 'next/navigation';
import ShowTableServer from './ShowTable.server';

export default function ShowTable({ data }) {
  const router = useRouter();

  async function handleDelete(id) {
    if (!confirm('Delete this show?')) return;
    await fetch('/api/shows/' + id, { method: 'DELETE' });
    router.refresh(); // Refresh server data
  };

  return <ShowTableServer data={data} onDelete={handleDelete} />;
};