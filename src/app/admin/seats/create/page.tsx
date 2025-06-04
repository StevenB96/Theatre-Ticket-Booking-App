// app/admin/seats/create/page.tsx
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CreateSeatForm = dynamic(
  () => import('./CreateSeatForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateSeatPage(): ReactNode {
  return (
    <div>
      <h1>Create Seat</h1>
      <CreateSeatForm />
    </div>
  );
};