// app/admin/shows/ShowTable.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { Show } from '@/types/show';
import ShowTableServer from './ShowTable.server';

interface ShowTableProps {
  data: Show[];
};

export default function ShowTable({ data }: ShowTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this show?')) return;
    await fetch('/api/shows/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <ShowTableServer data={data} onDelete={handleDelete} />;
};