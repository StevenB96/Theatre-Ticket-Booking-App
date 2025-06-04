// app/admin/shows/create/page.tsx
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CreateShowForm = dynamic(
  () => import('./CreateShowForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateShowPage(): ReactNode {
  return (
    <div>
      <h1>Create Show</h1>
      <CreateShowForm />
    </div>
  );
};