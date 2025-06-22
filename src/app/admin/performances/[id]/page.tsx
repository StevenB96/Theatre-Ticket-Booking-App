// app/admin/performances/[id]/edit/page.tsx

import { getPerformanceById } from '@/library/db/performance';
import EditPerformanceForm from './EditPerformanceForm';
import { PerformanceModel } from '@/models/PerformanceModel';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPerformancePage({ params }: PageProps) {
  const { id } = await params;
  const performance = await getPerformanceById(parseInt(id, 10));

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
      <h1>Edit Performance #{performance.id}</h1>
      <EditPerformanceForm
        performance={performance}
        theatreHasShowOptions={theatreHasShowOptions}
      />
    </div>
  );
}
