// app/admin/performances/[id]/edit/page.tsx
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { getPerformanceById } from '@/library/db/performance';

interface EditPerformancePageProps {
  params: Promise<{ id: string }>;
}

const EditPerformanceForm = dynamic(() => import('./EditPerformanceForm'), {
  loading: () => <p>Loading form…</p>,
});

export default async function EditPerformancePage({
  params,
}: EditPerformancePageProps): Promise<ReactNode> {
  const { id } = await params;
  const performanceIdFromUrl = parseInt(id, 10);
  const performance = await getPerformanceById(performanceIdFromUrl);

  if (!performance) {
    return (
      <div>
        <h1>Performance not found</h1>
        <p>No performance exists with ID #{performanceIdFromUrl}.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Performance #{performance.id}</h1>
      <EditPerformanceForm performance={performance} />
    </div>
  );
};
