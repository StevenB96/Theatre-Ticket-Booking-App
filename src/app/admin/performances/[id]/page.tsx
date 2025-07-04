// app/admin/performances/[id]/page.tsx

import React from 'react';
import PerformanceForm from '../PerformanceForm';
import { PerformanceModel } from '@/models/PerformanceModel';
import { TheatreModel } from '@/models/TheatreModel';
import { ShowModel } from '@/models/ShowModel';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPerformancePage({ params }: PageProps) {
  // await the params promise
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  const performanceData = (await PerformanceModel.load(id)).data;
  const theatresData = (await TheatreModel.findAll()).map(t => t.data);
  const showsData = (await ShowModel.findAll()).map(s => s.data);

  if (!performanceData) {
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
          Edit Performance #{performanceData.id}
        </h1>
      </div>
      <PerformanceForm
        performance={performanceData}
        theatres={theatresData}
        shows={showsData}
      />
    </div>
  );
}
