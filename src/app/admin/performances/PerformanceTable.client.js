'use client';

import { useRouter } from 'next/navigation';
import PerformanceTableServer from './PerformanceTable.server';

export default function PerformanceTable({ data }) {
  const router = useRouter();

  async function handleDelete(id) {
    if (!confirm('Delete this performance?')) return;
    await fetch('/api/performances/' + id, { method: 'DELETE' });
    router.refresh(); // Refresh server data
  };

  return <PerformanceTableServer data={data} onDelete={handleDelete} />;
};