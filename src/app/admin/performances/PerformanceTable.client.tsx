// app/admin/performances/PerformanceTable.client.tsx
'use client';

import { useRouter } from 'next/navigation';
import type { Performance } from '@/types/performance';
import PerformanceTableServer from './PerformanceTable.server';

interface PerformanceTableProps {
  data: Performance[];
};

export default function PerformanceTable({ data }: PerformanceTableProps) {
  const router = useRouter();

  async function handleDelete(id: number) {
    if (!confirm('Delete this performance?')) return;
    await fetch('/api/performances/' + id, { method: 'DELETE' });
    router.refresh();
  }

  return <PerformanceTableServer data={data} onDelete={handleDelete} />;
};
