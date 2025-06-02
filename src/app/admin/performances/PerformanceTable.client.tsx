// app/admin/performances/PerformanceTable.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import PerformanceTableServer from './PerformanceTable.server';

export default function PerformanceTable({ data }) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this performance?')) return;
    await fetch('/api/performances/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <PerformanceTableServer data={data} onDelete={handleDelete} />;
}
