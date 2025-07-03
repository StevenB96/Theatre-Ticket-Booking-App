// app/admin/performances/create/page.tsx

import React from 'react';
import PerformanceForm from '../PerformanceForm';
import { PerformanceModel } from '@/models/PerformanceModel';

export default async function CreatePerformancePage() {
  const theatreHasShowOptions = await PerformanceModel.loadTheatreHasShowOptions();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create Performance</h1>
      </div>
      <PerformanceForm
        theatreHasShowOptions={theatreHasShowOptions}
      />
    </div>
  );
}
