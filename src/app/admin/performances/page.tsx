// app/admin/performances/page.tsx
import Link from 'next/link';
import PerformanceTable from './PerformanceTable.client';
import { getAllPerformances } from '@/library/db/performance';
import type { ReactNode } from 'react';

export default async function PerformancesPage(): Promise<ReactNode> {
  const performances = await getAllPerformances();

  return (
    <div>
      <h1>Performances</h1>
      <p>
        <Link href="/admin/performances/create">+ New Performance</Link>
      </p>
      <PerformanceTable data={performances} />
    </div>
  );
};
