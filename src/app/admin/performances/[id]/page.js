import dynamic from 'next/dynamic';
import { getPerformanceById } from '@/library/db/performance';

const EditPerformanceForm = dynamic(
  () => import('./EditPerformanceForm'),
  { loading: () => <p>Loading form…</p> }
);

export default async function EditPerformancePage({ params }) {
  const { id: performanceId } = await params;
  const performance = await getPerformanceById(performanceId)

  return (
    <div>
      <h1>Edit Performance #{performance.id}</h1>
      <EditPerformanceForm performance={performance} />
    </div>
  );
};