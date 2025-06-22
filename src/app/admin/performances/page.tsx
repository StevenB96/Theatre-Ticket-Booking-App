// app/admin/performances/page.tsx

import Link from 'next/link';
import PerformanceTable from './PerformanceTable';
import { PerformanceModel } from '@/models/PerformanceModel';

export default async function PerformancesPage() {
  const performanceModels = await PerformanceModel.findAll();
  let performances;

  if (performanceModels) {
    performances = PerformanceModel.serialise(performanceModels);
  }

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
