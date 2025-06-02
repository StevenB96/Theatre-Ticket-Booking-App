// app/admin/performances/[id]/edit/page.tsx
import dynamic from 'next/dynamic';
import { getPerformanceById } from '@/library/db/performance';
import type { ReactNode } from 'react';

const EditPerformanceForm = dynamic<{
  performance: Performance;
}>(
  () => import('./EditPerformanceForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditPerformancePage({
  params,
}): Promise<ReactNode> {
  const performanceId = await params.id;
  const performance: any = await getPerformanceById(performanceId);

  return (
    <div>
      <h1>Edit Performance #{performance.id}</h1>
      <EditPerformanceForm performance={performance} />
    </div>
  );
};
