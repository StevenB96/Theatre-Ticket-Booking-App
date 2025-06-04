// app/admin/theatres/create/page.tsx
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const CreateTheatreForm = dynamic(
  () => import('./CreateTheatreForm'),
  { loading: () => <p>Loading form…</p> }
);

export default function CreateTheatrePage(): ReactNode {
  return (
    <div>
      <h1>Create Theatre</h1>
      <CreateTheatreForm />
    </div>
  );
};