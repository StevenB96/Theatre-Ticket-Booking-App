// app/admin/performances/page.tsx

import Link from 'next/link';
import PerformanceTable from './PerformanceTable';
import { PerformanceModel } from '@/models/PerformanceModel';

export default async function PerformancesPage() {
  const performances = await PerformanceModel.findAll(true);

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
