// app/admin/performances/[id]/page.tsx

import React from 'react';
import PerformanceForm from '../PerformanceForm';
import { PerformanceModel } from '@/models/PerformanceModel';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPerformancePage({ params }: PageProps) {
  // await the params promise
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);

  const performance = await PerformanceModel.load(id);
  const theatreHasShowOptions = await PerformanceModel.loadTheatreHasShowOptions();

  if (!performance) {
    return (
      <div>
        <h1>Performance not found</h1>
        <p>No performance exists with ID #{id}.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">
          Edit Performance #{performance.data.id}
        </h1>
      </div>
      <PerformanceForm
        performance={performance.data}
        theatreHasShowOptions={theatreHasShowOptions}
      />
    </div>
  );
}
