// app/admin/performances/create/page.tsx
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CreatePerformanceForm = dynamic(
  () => import('./CreatePerformanceForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreatePerformancePage(): ReactNode {
  return (
    <div>
      <h1>Create Performance</h1>
      <CreatePerformanceForm />
    </div>
  );
}
