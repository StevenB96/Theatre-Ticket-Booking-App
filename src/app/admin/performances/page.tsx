// app/admin/performances/page.tsx

import Link from 'next/link';
import PerformanceTable from './PerformanceTable';
import { PerformanceModel } from '@/models/PerformanceModel';

export default async function PerformancesPage() {
  const performanceModels = await PerformanceModel.findAll();
  const performances = PerformanceModel.serialise(performanceModels);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Performances</h1>
        <Link href="/admin/performances/create" className="page-action">
          + New Performance
        </Link>
      </div>
      <PerformanceTable data={performances} />
    </div>
  );
}
