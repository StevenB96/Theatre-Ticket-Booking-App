// app/admin/performances/create/page.tsx

import React from 'react';
import { PerformanceModel } from '@/models/PerformanceModel';
import CreatePerformanceForm from './CreatePerformanceForm';

export default async function CreatePerformancePage() {
  const theatreHasShowOptions = await PerformanceModel.loadTheatreHasShowOptions();

  return (
    <div>
      <h1>Create Performance</h1>
      <CreatePerformanceForm
        theatreHasShowOptions={theatreHasShowOptions}
      />
    </div>
  );
}
