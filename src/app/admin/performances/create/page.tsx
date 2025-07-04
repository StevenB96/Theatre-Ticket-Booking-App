// app/admin/performances/create/page.tsx

import React from 'react';
import PerformanceForm from '../PerformanceForm';
import { TheatreModel } from '@/models/TheatreModel';
import { ShowModel } from '@/models/ShowModel';

export default async function CreatePerformancePage() {
  const theatresData = (await TheatreModel.findAll()).map(t => t.data);
  const showsData = (await ShowModel.findAll()).map(s => s.data);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Create Performance</h1>
      </div>
      <PerformanceForm
        theatres={theatresData}
        shows={showsData}
      />
    </div>
  );
}
