import dynamic from 'next/dynamic';

const CreatePerformanceForm = dynamic(
  () => import('./CreatePerformanceForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreatePerformancePage() {
  return (
    <div>
      <h1>Create Performance</h1>
      <CreatePerformanceForm />
    </div>
  );
};